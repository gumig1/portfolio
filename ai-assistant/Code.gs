/**
 * ============================================================================
 * 🌿 구미천연향수공방 사장님 비서 - Google Apps Script (Code.gs)
 * ============================================================================
 * - 연결할 구글 시트 이름: 「구미천연향수공방」
 * - 저장될 하단 시트 탭 이름: 「2026년」 (없으면 자동으로 만들어 줍니다)
 * - 저장 항목: 날짜 | 구분 | 인원 | 금액 | 결제수단 | 유입경로 | 메모 | 말씀하신 원문 | 등록일시
 * ============================================================================
 */

// 1. 기본 설정값
const CONFIG = {
  SPREADSHEET_NAME: '구미천연향수공방',
  SHEET_TAB_NAME: '2026년',
  // 선택사항: 구글 Gemini API 키를 넣으면 AI 분석이 더 정교해집니다.
  // 비워두셔도 내장된 한국어 분석 엔진이 자동으로 분석해 주므로 바로 사용 가능합니다!
  GEMINI_API_KEY: '',
  CATEGORIES: ['원데이 클래스', '자격증반', '완제품 구매', '답례품', '기타'],
  PAYMENTS: ['카드', '현금', '계좌이체', '기타'],
  CHANNELS: ['인스타그램', '네이버 검색/블로그', '지인 소개', '재방문', '워크인(지나가다 방문)', '기타']
};

/**
 * 웹 앱 접속 확인용 (GET 요청)
 */
function doGet(e) {
  const action = (e && e.parameter && e.parameter.action) || 'status';

  if (action === 'recent') {
    return createJsonResponse(getRecentRows(5));
  }

  return createJsonResponse({
    ok: true,
    shopName: CONFIG.SPREADSHEET_NAME,
    sheetTab: CONFIG.SHEET_TAB_NAME,
    message: '구미천연향수공방 사장님 비서 웹 앱이 정상 작동 중입니다.'
  });
}

/**
 * 데이터 분석 및 시트 저장 처리 (POST 요청)
 * GitHub / Vercel 등 외부 화면(index.html)에서 보낸 요청을 처리합니다.
 */
function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return createJsonResponse({ ok: false, error: '전달된 데이터가 없습니다.' });
    }

    const body = JSON.parse(e.postData.contents);
    const action = body.action || 'save';

    // 1) 음성/문장 AI 정리 요청
    if (action === 'parse') {
      const text = (body.text || '').trim();
      if (!text) {
        return createJsonResponse({ ok: false, error: '분석할 문장을 입력해 주세요.' });
      }
      const parsed = analyzeSalesText(text);
      return createJsonResponse({ ok: true, data: parsed });
    }

    // 2) 확인 완료 후 구글 시트에 한 줄 저장 요청
    if (action === 'save') {
      const record = body.data || body;
      const saved = appendSalesRow(record);
      return createJsonResponse({
        ok: true,
        message: '「구미천연향수공방」 시트 [2026년] 탭에 저장되었습니다.',
        saved: saved,
        recent: getRecentRows(5).rows
      });
    }

    // 3) 최근 저장 내역 조회
    if (action === 'recent') {
      return createJsonResponse(getRecentRows(body.limit || 5));
    }

    return createJsonResponse({ ok: false, error: '알 수 없는 요청입니다: ' + action });
  } catch (err) {
    return createJsonResponse({
      ok: false,
      error: '처리 중 오류가 발생했습니다: ' + (err.message || String(err))
    });
  }
}

/**
 * 처음 한 번 실행해 시트 탭(2026년)과 표 제목줄을 세팅하는 함수
 * (저장할 때도 자동으로 실행되므로 수동 실행하지 않으셔도 됩니다)
 */
function setupSheet() {
  const sheet = getOrCreateTargetSheet();
  Logger.log('시트 준비 완료: ' + sheet.getName());
}

/**
 * 「2026년」 시트 탭을 가져오거나 없으면 새로 생성하고 헤더를 꾸며줍니다.
 */
function getOrCreateTargetSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(CONFIG.SHEET_TAB_NAME);

  if (!sheet) {
    sheet = ss.insertSheet(CONFIG.SHEET_TAB_NAME);
  }

  // 첫 번째 줄(헤더)이 비어 있으면 제목줄 자동 생성 및 디자인 적용
  if (sheet.getLastRow() === 0) {
    const headers = [
      '날짜',
      '구분',
      '인원',
      '금액',
      '결제수단',
      '유입경로',
      '메모',
      '말씀하신 원문',
      '기록일시'
    ];
    sheet.appendRow(headers);

    const headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange.setBackground('#8B5E3C'); // 따뜻한 우드 톤
    headerRange.setFontColor('#FAF6F0');  // 베이지 화이트 글씨
    headerRange.setFontWeight('bold');
    headerRange.setHorizontalAlignment('center');
    sheet.setFrozenRows(1);

    // 열 너비 보기 좋게 조정
    sheet.setColumnWidth(1, 110); // 날짜
    sheet.setColumnWidth(2, 120); // 구분
    sheet.setColumnWidth(3, 70);  // 인원
    sheet.setColumnWidth(4, 110); // 금액
    sheet.setColumnWidth(5, 100); // 결제수단
    sheet.setColumnWidth(6, 150); // 유입경로
    sheet.setColumnWidth(7, 220); // 메모
    sheet.setColumnWidth(8, 260); // 말씀하신 원문
    sheet.setColumnWidth(9, 150); // 기록일시
  }

  return sheet;
}

/**
 * 확인된 매출 데이터를 시트에 한 줄로 추가합니다.
 */
function appendSalesRow(record) {
  const sheet = getOrCreateTargetSheet();
  const tz = Session.getScriptTimeZone() || 'Asia/Seoul';
  const nowStr = Utilities.formatDate(new Date(), tz, 'yyyy-MM-dd HH:mm:ss');

  const dateStr = record.date || Utilities.formatDate(new Date(), tz, 'yyyy-MM-dd');
  const category = record.category || '원데이 클래스';
  const count = Number(String(record.count || 1).replace(/[^0-9]/g, '')) || 1;
  const amount = Number(String(record.amount || 0).replace(/[^0-9]/g, '')) || 0;
  const payment = record.payment || '카드';
  const channel = record.channel || '인스타그램';
  const memo = (record.memo || '').trim();
  const rawText = (record.rawText || '').trim();

  const rowValues = [
    dateStr,
    category,
    count,
    amount,
    payment,
    channel,
    memo,
    rawText,
    nowStr
  ];

  sheet.appendRow(rowValues);
  const lastRow = sheet.getLastRow();

  // 서식 정리 (인원/금액 숫자 포맷 및 가운데 정렬)
  sheet.getRange(lastRow, 1, 1, 2).setHorizontalAlignment('center');
  sheet.getRange(lastRow, 3).setNumberFormat('#,##0"명"').setHorizontalAlignment('center');
  sheet.getRange(lastRow, 4).setNumberFormat('#,##0"원"').setHorizontalAlignment('right');
  sheet.getRange(lastRow, 5, 1, 2).setHorizontalAlignment('center');

  return {
    rowNumber: lastRow,
    date: dateStr,
    category: category,
    count: count,
    amount: amount,
    payment: payment,
    channel: channel,
    memo: memo
  };
}

/**
 * 최근 저장된 내역 N건을 가져옵니다.
 */
function getRecentRows(limit) {
  const sheet = getOrCreateTargetSheet();
  const lastRow = sheet.getLastRow();
  if (lastRow <= 1) {
    return { ok: true, rows: [] };
  }

  const count = Math.min(limit || 5, lastRow - 1);
  const startRow = lastRow - count + 1;
  const values = sheet.getRange(startRow, 1, count, 7).getDisplayValues();

  const rows = values.reverse().map(function (r) {
    return {
      date: r[0],
      category: r[1],
      count: r[2],
      amount: r[3],
      payment: r[4],
      channel: r[5],
      memo: r[6]
    };
  });

  return { ok: true, rows: rows };
}

/**
 * 사장님이 말씀하신 문장을 분석합니다.
 * Gemini API 키가 있으면 Gemini를 먼저 사용하고, 없거나 실패하면 내장 한국어 분석기를 사용합니다.
 */
function analyzeSalesText(text) {
  const apiKey = CONFIG.GEMINI_API_KEY || PropertiesService.getScriptProperties().getProperty('GEMINI_API_KEY');
  if (apiKey) {
    try {
      const geminiResult = callGeminiParser(text, apiKey);
      if (geminiResult) return geminiResult;
    } catch (e) {
      Logger.log('Gemini 호출 실패, 내장 분석기로 전환: ' + e);
    }
  }
  return parseKoreanSalesText(text);
}

/**
 * Gemini API를 이용한 자연어 분석 (선택사항)
 */
function callGeminiParser(text, apiKey) {
  const tz = Session.getScriptTimeZone() || 'Asia/Seoul';
  const todayStr = Utilities.formatDate(new Date(), tz, 'yyyy-MM-dd');

  const prompt = [
    '당신은 구미천연향수공방 사장님의 매출 장부 비서입니다.',
    '오늘 날짜는 ' + todayStr + ' 입니다.',
    '사장님이 말한 문장에서 다음 JSON 형식으로만 정확히 추출하세요:',
    '{',
    '  "date": "YYYY-MM-DD",',
    '  "category": "원데이 클래스 | 자격증반 | 완제품 구매 | 답례품 | 기타 중 하나",',
    '  "count": 숫자(인원수 또는 수량, 기본값 1),',
    '  "amount": 숫자(원 단위 금액, 예: 7만원 -> 70000),',
    '  "payment": "카드 | 현금 | 계좌이체 | 기타 중 하나",',
    '  "channel": "인스타그램 | 네이버 검색/블로그 | 지인 소개 | 재방문 | 워크인(지나가다 방문) | 기타 중 하나",',
    '  "memo": "위 항목 외에 특이사항이나 메모할 내용이 있으면 적고 없으면 빈 문자열"',
    '}',
    '문장: "' + text + '"'
  ].join('\n');

  const url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=' + encodeURIComponent(apiKey);
  const response = UrlFetchApp.fetch(url, {
    method: 'post',
    contentType: 'application/json',
    payload: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { responseMimeType: 'application/json', temperature: 0.1 }
    }),
    muteHttpExceptions: true
  });

  if (response.getResponseCode() !== 200) {
    return null;
  }

  const json = JSON.parse(response.getContentText());
  const raw = json.candidates && json.candidates[0] && json.candidates[0].content.parts[0].text;
  if (!raw) return null;

  const parsed = JSON.parse(raw);
  parsed.rawText = text;
  return parsed;
}

/**
 * API 키 없이도 즉시 작동하는 한국어 매출 문장 분석기
 * 예: "오늘 원데이 클래스 2명 7만원 카드, 인스타 보고 옴, 우디향 선호"
 */
function parseKoreanSalesText(text) {
  const tz = Session.getScriptTimeZone() || 'Asia/Seoul';
  const now = new Date();

  // 1. 날짜 추출
  let targetDate = new Date(now.getTime());
  if (/그제|그저께/.test(text)) {
    targetDate.setDate(targetDate.getDate() - 2);
  } else if (/어제/.test(text)) {
    targetDate.setDate(targetDate.getDate() - 1);
  } else {
    const mdMatch = text.match(/(\d{1,2})\s*월\s*(\d{1,2})\s*일/);
    if (mdMatch) {
      targetDate = new Date(now.getFullYear(), parseInt(mdMatch[1], 10) - 1, parseInt(mdMatch[2], 10));
    }
  }
  const dateStr = Utilities.formatDate(targetDate, tz, 'yyyy-MM-dd');

  // 2. 구분 추출
  let category = '원데이 클래스';
  if (/자격증|창업|전문가|강사/.test(text)) {
    category = '자격증반';
  } else if (/답례품|단체|기념품|선물세트/.test(text)) {
    category = '답례품';
  } else if (/완제품|구매|판매|제품|디퓨저|향수\s*구매/.test(text)) {
    category = '완제품 구매';
  } else if (/원데이|클래스|체험|커플|수업/.test(text)) {
    category = '원데이 클래스';
  }

  // 3. 인원 추출
  let count = 1;
  const countMatch = text.match(/(\d+)\s*(?:명|분|인|팀|개|건)/);
  if (countMatch) {
    count = parseInt(countMatch[1], 10);
  } else {
    const korCountMap = { '한': 1, '두': 2, '세': 3, '네': 4, '다섯': 5, '여섯': 6 };
    const korMatch = text.match(/(한|두|세|네|다섯|여섯)\s*(?:명|분|팀)/);
    if (korMatch && korCountMap[korMatch[1]]) {
      count = korCountMap[korMatch[1]];
    }
  }

  // 4. 금액 추출 (예: 7만원, 7만5천원, 75,000원, 75000원)
  let amount = 0;
  const manCheonMatch = text.match(/(\d+)\s*만\s*(\d+)\s*천\s*원?/);
  const manHalfMatch = text.match(/(\d+)\s*만\s*오천\s*원?/);
  const manMatch = text.match(/(\d+(?:\.\d+)?)\s*만\s*원?/);
  const cheonMatch = text.match(/(\d+)\s*천\s*원?/);
  const wonMatch = text.match(/(\d{1,3}(?:,\d{3})+|\d{4,})\s*원?/);

  if (manCheonMatch) {
    amount = parseInt(manCheonMatch[1], 10) * 10000 + parseInt(manCheonMatch[2], 10) * 1000;
  } else if (manHalfMatch) {
    amount = parseInt(manHalfMatch[1], 10) * 10000 + 5000;
  } else if (manMatch) {
    amount = Math.round(parseFloat(manMatch[1]) * 10000);
  } else if (cheonMatch) {
    amount = parseInt(cheonMatch[1], 10) * 1000;
  } else if (wonMatch) {
    amount = parseInt(wonMatch[1].replace(/,/g, ''), 10);
  }

  // 5. 결제수단 추출
  let payment = '카드';
  if (/계좌\s*이체|이체|무통장|입금/.test(text)) {
    payment = '계좌이체';
  } else if (/현금|현찰/.test(text)) {
    payment = '현금';
  } else if (/카드|결제/.test(text)) {
    payment = '카드';
  }

  // 6. 유입경로 추출
  let channel = '인스타그램';
  if (/인스타|릴스|피드|DM|디엠/.test(text)) {
    channel = '인스타그램';
  } else if (/네이버|블로그|검색|플레이스|지도/.test(text)) {
    channel = '네이버 검색/블로그';
  } else if (/지인|소개|추천|친구/.test(text)) {
    channel = '지인 소개';
  } else if (/재방문|단골|또\s*오|다시\s*오/.test(text)) {
    channel = '재방문';
  } else if (/워크인|지나가다|길가다|간판|근처/.test(text)) {
    channel = '워크인(지나가다 방문)';
  }

  // 7. 메모 추출 (이미 인식된 기본 키워드를 제외한 특이사항 정리)
  let memo = extractMemoFromText(text);

  return {
    date: dateStr,
    category: category,
    count: count,
    amount: amount,
    payment: payment,
    channel: channel,
    memo: memo,
    rawText: text
  };
}

/**
 * 문장에서 날짜/구분/인원/금액/결제/유입경로 표현을 덜어내고 남은 특이사항을 메모로 추출합니다.
 */
function extractMemoFromText(text) {
  let cleaned = text
    .replace(/오늘|어제|그제|그저께|\d{1,2}\s*월\s*\d{1,2}\s*일/g, '')
    .replace(/원데이\s*클래스|원데이|자격증반|자격증|완제품\s*구매|완제품|답례품|클래스|수업/g, '')
    .replace(/(\d+|한|두|세|네|다섯|여섯)\s*(명|분|인|팀|개|건)/g, '')
    .replace(/\d+\s*만\s*\d+\s*천\s*원?|\d+\s*만\s*오천\s*원?|\d+(?:\.\d+)?\s*만\s*원?|\d+\s*천\s*원?|(\d{1,3}(?:,\d{3})+|\d{4,})\s*원?/g, '')
    .replace(/계좌\s*이체|이체|현금|카드\s*결제|카드/g, '')
    .replace(/(인스타그램|인스타|네이버\s*검색|네이버\s*블로그|네이버|블로그|지인\s*소개|지인|재방문|워크인|지나가다\s*방문|지나가다)\s*(보고\s*옴|보고\s*오심|보고\s*왔음|방문|오심|옴|왔음|통해)?/g, '')
    .replace(/^[\s,./·-]+|[\s,./·-]+$/g, '')
    .replace(/\s{2,}/g, ' ')
    .trim();

  return cleaned;
}

/**
 * JSON 응답 생성 헬퍼
 */
function createJsonResponse(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
