export interface Artifact {
  id: number;
  name: string;      // 名称
  material: string;  // 材质标签
  dynasty: string;   // 朝代 (对应: 先秦, 汉代, 魏晋南北朝, 隋唐, 宋元, 明, 清, 近现代)
  image: string;     // 图片路径
  description?: string; // 描述 (可选)
}

export const artifacts: Artifact[] = [
  {
    id: 1,
    name: "窑变釉犬",
    material: "瓷器",
    dynasty: "清代",
    image: "/ancient-artifacts/文物标号/1.png"
  },
  {
    id: 2,
    name: "青釉狗圈",
    material: "瓷器",
    dynasty: "魏晋南北朝",
    image: "/ancient-artifacts/文物标号/2.png"
  },
  {
    id: 3,
    name: "名笔集胜册 - 李迪猎犬图页",
    material: "书画",
    dynasty: "宋元",
    image: "/ancient-artifacts/文物标号/3.png"
  },
  {
    id: 4,
    name: "卧犬形牌饰",
    material: "铜器",
    dynasty: "隋唐",
    image: "/ancient-artifacts/文物标号/4.png"
  },
  {
    id: 5,
    name: "犬狼纹牌饰",
    material: "铜器",
    dynasty: "汉代",
    image: "/ancient-artifacts/文物标号/5.png"
  },
  {
    id: 6,
    name: "陶绿釉狗",
    material: "陶器",
    dynasty: "汉代",
    image: "/ancient-artifacts/文物标号/6.png"
  },
  {
    id: 7,
    name: "青釉褐彩狗",
    material: "瓷器",
    dynasty: "宋元",
    image: "/ancient-artifacts/文物标号/7.png"
  },
  {
    id: 8,
    name: "陶绿釉狗",
    material: "陶器",
    dynasty: "明代",
    image: "/ancient-artifacts/文物标号/8.png"
  },
  {
    id: 9,
    name: "陶狗",
    material: "陶器",
    dynasty: "隋唐",
    image: "/ancient-artifacts/文物标号/9.png"
  },
  {
    id: 10,
    name: "陶狗",
    material: "陶器",
    dynasty: "汉代",
    image: "/ancient-artifacts/文物标号/10.png"
  },
  {
    id: 11,
    name: "陶狗",
    material: "陶器",
    dynasty: "汉代",
    image: "/ancient-artifacts/文物标号/11.png"
  },
  {
    id: 12,
    name: "陶狗",
    material: "陶器",
    dynasty: "汉代",
    image: "/ancient-artifacts/文物标号/12.png"
  },
  {
    id: 13,
    name: "陶狗",
    material: "陶器",
    dynasty: "汉代",
    image: "/ancient-artifacts/文物标号/13.png"
  },
  {
    id: 14,
    name: "陶画彩狗",
    material: "陶器",
    dynasty: "隋唐",
    image: "/ancient-artifacts/文物标号/14.png"
  },
  {
    id: 15,
    name: "陶画彩狗",
    material: "陶器",
    dynasty: "汉代",
    image: "/ancient-artifacts/文物标号/15.png"
  },
  {
    id: 16,
    name: "陶画彩狗",
    material: "陶器",
    dynasty: "汉代",
    image: "/ancient-artifacts/文物标号/16.png"
  },
  {
    id: 17,
    name: "陶狗",
    material: "陶器",
    dynasty: "汉代",
    image: "/ancient-artifacts/文物标号/17.png"
  },
  {
    id: 18,
    name: "陶淡黄釉狗",
    material: "陶器",
    dynasty: "隋唐",
    image: "/ancient-artifacts/文物标号/18.png"
  },
  {
    id: 19,
    name: "陶狗",
    material: "陶器",
    dynasty: "汉代",
    image: "/ancient-artifacts/文物标号/19.png"
  },
  {
    id: 20,
    name: "陶画彩狗",
    material: "陶器",
    dynasty: "隋唐",
    image: "/ancient-artifacts/文物标号/20.png"
  },
  {
    id: 21,
    name: "陶狗",
    material: "陶器",
    dynasty: "隋唐",
    image: "/ancient-artifacts/文物标号/21.png"
  },
  {
    id: 22,
    name: "陶画彩狗",
    material: "陶器",
    dynasty: "隋唐",
    image: "/ancient-artifacts/文物标号/22.png"
  },
  {
    id: 23,
    name: "陶黄釉狗",
    material: "陶器",
    dynasty: "汉代",
    image: "/ancient-artifacts/文物标号/23.png"
  },
  {
    id: 24,
    name: "陶黄釉狗",
    material: "陶器",
    dynasty: "汉代",
    image: "/ancient-artifacts/文物标号/24.png"
  },
  {
    id: 25,
    name: "陶黄釉狗",
    material: "陶器",
    dynasty: "宋元",
    image: "/ancient-artifacts/文物标号/25.png"
  },
  {
    id: 26,
    name: "青釉卧狗",
    material: "瓷器",
    dynasty: "魏晋南北朝",
    image: "/ancient-artifacts/文物标号/26.png"
  },
  {
    id: 27,
    name: "青釉卧狗",
    material: "瓷器",
    dynasty: "隋唐",
    image: "/ancient-artifacts/文物标号/27.png"
  },
  {
    id: 28,
    name: "青釉卧狗",
    material: "瓷器",
    dynasty: "隋唐",
    image: "/ancient-artifacts/文物标号/28.png"
  },
  {
    id: 29,
    name: "白釉瓷黑花狗",
    material: "瓷器",
    dynasty: "宋元",
    image: "/ancient-artifacts/文物标号/29.png"
  },
  {
    id: 30,
    name: "白釉瓷绿彩狗",
    material: "瓷器",
    dynasty: "宋元",
    image: "/ancient-artifacts/文物标号/30.png"
  },
  {
    id: 31,
    name: "白釉瓷黑花狗",
    material: "瓷器",
    dynasty: "宋元",
    image: "/ancient-artifacts/文物标号/31.png"
  },
  {
    id: 32,
    name: "黄釉瓷卧狗",
    material: "瓷器",
    dynasty: "宋元",
    image: "/ancient-artifacts/文物标号/32.png"
  },
  {
    id: 33,
    name: "陶狗",
    material: "陶器",
    dynasty: "汉代",
    image: "/ancient-artifacts/文物标号/33.png"
  },
  {
    id: 34,
    name: "陶狗",
    material: "陶器",
    dynasty: "汉代",
    image: "/ancient-artifacts/文物标号/34.png"
  },
  {
    id: 35,
    name: "陶黄釉狗",
    material: "陶器",
    dynasty: "汉代",
    image: "/ancient-artifacts/文物标号/35.png"
  },
  {
    id: 36,
    name: "陶黄釉狗",
    material: "陶器",
    dynasty: "宋元",
    image: "/ancient-artifacts/文物标号/36.png"
  },
  {
    id: 37,
    name: "陶狗",
    material: "陶器",
    dynasty: "隋唐",
    image: "/ancient-artifacts/文物标号/37.png"
  },
  {
    id: 38,
    name: "陶黄釉狗",
    material: "陶器",
    dynasty: "隋唐",
    image: "/ancient-artifacts/文物标号/38.png"
  },
  {
    id: 39,
    name: "陶黄釉狗",
    material: "陶器",
    dynasty: "隋唐",
    image: "/ancient-artifacts/文物标号/39.png"
  },
  {
    id: 40,
    name: "陶画彩狗",
    material: "陶器",
    dynasty: "隋唐",
    image: "/ancient-artifacts/文物标号/40.png"
  },
  {
    id: 41,
    name: "陶画彩狗",
    material: "陶器",
    dynasty: "汉代",
    image: "/ancient-artifacts/文物标号/41.png"
  },
  {
    id: 42,
    name: "陶狗",
    material: "陶器",
    dynasty: "汉代",
    image: "/ancient-artifacts/文物标号/42.png"
  },
  {
    id: 43,
    name: "陶狗",
    material: "陶器",
    dynasty: "汉代",
    image: "/ancient-artifacts/文物标号/43.png"
  },
  {
    id: 44,
    name: "陶狗",
    material: "陶器",
    dynasty: "汉代",
    image: "/ancient-artifacts/文物标号/44.png"
  },
  {
    id: 45,
    name: "陶黄釉狗",
    material: "陶器",
    dynasty: "隋唐",
    image: "/ancient-artifacts/文物标号/45.png"
  },
  {
    id: 46,
    name: "陶画彩狗",
    material: "陶器",
    dynasty: "汉代",
    image: "/ancient-artifacts/文物标号/46.png"
  },
  {
    id: 47,
    name: "陶画彩狗",
    material: "陶器",
    dynasty: "汉代",
    image: "/ancient-artifacts/文物标号/47.png"
  },
  {
    id: 48,
    name: "陶狗",
    material: "陶器",
    dynasty: "汉代",
    image: "/ancient-artifacts/文物标号/48.png"
  },
  {
    id: 49,
    name: "三彩狗",
    material: "陶器",
    dynasty: "宋元",
    image: "/ancient-artifacts/文物标号/49.png"
  },
  {
    id: 50,
    name: "陶画彩狗",
    material: "陶器",
    dynasty: "宋元",
    image: "/ancient-artifacts/文物标号/50.png"
  },
  {
    id: 51,
    name: "陶狗",
    material: "陶器",
    dynasty: "宋元",
    image: "/ancient-artifacts/文物标号/51.png"
  },
  {
    id: 52,
    name: "陶画彩狗",
    material: "陶器",
    dynasty: "汉代",
    image: "/ancient-artifacts/文物标号/52.png"
  },
  {
    id: 53,
    name: "陶母子狗",
    material: "陶器",
    dynasty: "魏晋南北朝",
    image: "/ancient-artifacts/文物标号/53.png"
  },
  {
    id: 54,
    name: "陶狗",
    material: "陶器",
    dynasty: "汉代",
    image: "/ancient-artifacts/文物标号/54.png"
  },
  {
    id: 55,
    name: "陶狗",
    material: "陶器",
    dynasty: "汉代",
    image: "/ancient-artifacts/文物标号/55.png"
  },
  {
    id: 56,
    name: "邛窑狗",
    material: "瓷器",
    dynasty: "隋唐",
    image: "/ancient-artifacts/文物标号/56.png"
  },
  {
    id: 57,
    name: "陶狗",
    material: "陶器",
    dynasty: "隋唐",
    image: "/ancient-artifacts/文物标号/57.png"
  },
  {
    id: 58,
    name: "陶黄釉狗",
    material: "陶器",
    dynasty: "隋唐",
    image: "/ancient-artifacts/文物标号/58.png"
  },
  {
    id: 59,
    name: "陶画彩狗",
    material: "陶器",
    dynasty: "隋唐",
    image: "/ancient-artifacts/文物标号/59.png"
  },
  {
    id: 60,
    name: "陶黄釉狗",
    material: "陶器",
    dynasty: "隋唐",
    image: "/ancient-artifacts/文物标号/60.png"
  },
  {
    id: 61,
    name: "陶狗",
    material: "陶器",
    dynasty: "汉代",
    image: "/ancient-artifacts/文物标号/61.png"
  },
  {
    id: 62,
    name: "陶绿釉狗",
    material: "陶器",
    dynasty: "汉代",
    image: "/ancient-artifacts/文物标号/62.png"
  },
  {
    id: 63,
    name: "陶狗",
    material: "陶器",
    dynasty: "汉代",
    image: "/ancient-artifacts/文物标号/63.png"
  },
  {
    id: 64,
    name: "红陶银釉狗",
    material: "陶器",
    dynasty: "汉代",
    image: "/ancient-artifacts/文物标号/64.png"
  },
  {
    id: 65,
    name: "陶狗",
    material: "陶器",
    dynasty: "汉代",
    image: "/ancient-artifacts/文物标号/65.png"
  },
  {
    id: 66,
    name: "陶绿釉狗",
    material: "陶器",
    dynasty: "汉代",
    image: "/ancient-artifacts/文物标号/66.png"
  },
  {
    id: 67,
    name: "陶釉狗",
    material: "陶器",
    dynasty: "汉代",
    image: "/ancient-artifacts/文物标号/67.png"
  },
  {
    id: 68,
    name: "木小狗",
    material: "木器",
    dynasty: "清代",
    image: "/ancient-artifacts/文物标号/68.png"
  },
  {
    id: 69,
    name: "青玉犬",
    material: "其他",
    dynasty: "明代",
    image: "/ancient-artifacts/文物标号/69.png"
  },
  {
    id: 70,
    name: "犬纹半瓦当",
    material: "陶器",
    dynasty: "先秦",
    image: "/ancient-artifacts/文物标号/70.png"
  },
  {
    id: 71,
    name: "白瓷狗",
    material: "瓷器",
    dynasty: "宋元",
    image: "/ancient-artifacts/文物标号/71.png"
  },
  {
    id: 72,
    name: "青白瓷狗",
    material: "瓷器",
    dynasty: "宋元",
    image: "/ancient-artifacts/文物标号/72.png"
  },
  {
    id: 73,
    name: "陶画彩狗",
    material: "陶器",
    dynasty: "汉代",
    image: "/ancient-artifacts/文物标号/73.png"
  },
  {
    id: 74,
    name: "陶黄釉狗",
    material: "陶器",
    dynasty: "隋唐",
    image: "/ancient-artifacts/文物标号/74.png"
  },
  {
    id: 75,
    name: "陶黄釉狗",
    material: "陶器",
    dynasty: "隋唐",
    image: "/ancient-artifacts/文物标号/75.png"
  },
  {
    id: 76,
    name: "陶狗",
    material: "陶器",
    dynasty: "隋唐",
    image: "/ancient-artifacts/文物标号/76.png"
  },
  {
    id: 77,
    name: "石湾窑青釉卧狗",
    material: "瓷器",
    dynasty: "宋元",
    image: "/ancient-artifacts/文物标号/77.png"
  },
  {
    id: 78,
    name: "青瓷卧狗盘",
    material: "瓷器",
    dynasty: "魏晋南北朝",
    image: "/ancient-artifacts/文物标号/78.png"
  },
  {
    id: 79,
    name: "黑釉瓷卧狗",
    material: "瓷器",
    dynasty: "宋元",
    image: "/ancient-artifacts/文物标号/79.png"
  },
  {
    id: 80,
    name: "瓷黑釉卧狗",
    material: "瓷器",
    dynasty: "宋元",
    image: "/ancient-artifacts/文物标号/80.png"
  },
  {
    id: 81,
    name: "陶黄釉狗",
    material: "陶器",
    dynasty: "汉代",
    image: "/ancient-artifacts/文物标号/81.png"
  },
  {
    id: 82,
    name: "五彩瓷抱狗人坐像",
    material: "瓷器",
    dynasty: "宋元",
    image: "/ancient-artifacts/文物标号/82.png"
  },
  {
    id: 83,
    name: "陶黄釉狗",
    material: "陶器",
    dynasty: "隋唐",
    image: "/ancient-artifacts/文物标号/83.png"
  },
  {
    id: 84,
    name: "陶黄釉狗",
    material: "陶器",
    dynasty: "隋唐",
    image: "/ancient-artifacts/文物标号/84.png"
  },
  {
    id: 85,
    name: "陶黄釉坐狗",
    material: "陶器",
    dynasty: "宋元",
    image: "/ancient-artifacts/文物标号/85.png"
  },
  {
    id: 86,
    name: "白釉瓷抱狗人像",
    material: "瓷器",
    dynasty: "宋元",
    image: "/ancient-artifacts/文物标号/86.png"
  },
  {
    id: 87,
    name: "陶狗",
    material: "陶器",
    dynasty: "汉代",
    image: "/ancient-artifacts/文物标号/87.png"
  },
  {
    id: 88,
    name: "清人猎犬图册",
    material: "书画",
    dynasty: "清代",
    image: "/ancient-artifacts/文物标号/88.png"
  },
  {
    id: 89,
    name: "清人猎犬图册",
    material: "书画",
    dynasty: "清代",
    image: "/ancient-artifacts/文物标号/89.png"
  },
  {
    id: 90,
    name: "清人猎犬图册",
    material: "书画",
    dynasty: "清代",
    image: "/ancient-artifacts/文物标号/90.png"
  },
  {
    id: 91,
    name: "清人猎犬图册",
    material: "书画",
    dynasty: "清代",
    image: "/ancient-artifacts/文物标号/91.png"
  },
  {
    id: 92,
    name: "清人猎犬图册",
    material: "书画",
    dynasty: "清代",
    image: "/ancient-artifacts/文物标号/92.png"
  },
  {
    id: 93,
    name: "清人猎犬图册",
    material: "书画",
    dynasty: "清代",
    image: "/ancient-artifacts/文物标号/93.png"
  },
  {
    id: 94,
    name: "清人猎犬图册",
    material: "书画",
    dynasty: "清代",
    image: "/ancient-artifacts/文物标号/94.png"
  },
  {
    id: 95,
    name: "清人猎犬图册",
    material: "书画",
    dynasty: "清代",
    image: "/ancient-artifacts/文物标号/95.png"
  },
  {
    id: 96,
    name: "清人猎犬图册",
    material: "书画",
    dynasty: "清代",
    image: "/ancient-artifacts/文物标号/96.png"
  },
  {
    id: 97,
    name: "清人猎犬图册",
    material: "书画",
    dynasty: "清代",
    image: "/ancient-artifacts/文物标号/97.png"
  },
  {
    id: 98,
    name: "“易口犬” 鼻钮铜印",
    material: "铜器",
    dynasty: "先秦",
    image: "/ancient-artifacts/文物标号/98.png"
  },
  {
    id: 99,
    name: "雍正款象牙雕卧犬图圆盒",
    material: "其他",
    dynasty: "清代",
    image: "/ancient-artifacts/文物标号/99.png"
  },
  {
    id: 100,
    name: "鎏金犬纹牌饰",
    material: "铜器",
    dynasty: "宋元",
    image: "/ancient-artifacts/文物标号/100.png"
  },
  {
    id: 101,
    name: "雕双犬长方石砚",
    material: "其他",
    dynasty: "明代",
    image: "/ancient-artifacts/文物标号/101.png"
  },
  {
    id: 102,
    name: "詹大有天然如意犬墨",
    material: "其他",
    dynasty: "近现代",
    image: "/ancient-artifacts/文物标号/102.png"
  },
  {
    id: 103,
    name: "詹大有天然如意犬墨",
    material: "其他",
    dynasty: "近现代",
    image: "/ancient-artifacts/文物标号/103.png"
  },
  {
    id: 104,
    name: "陶狗",
    material: "陶器",
    dynasty: "汉代",
    image: "/ancient-artifacts/文物标号/104.png"
  },
  {
    id: 105,
    name: "陶画彩狗",
    material: "陶器",
    dynasty: "汉代",
    image: "/ancient-artifacts/文物标号/105.png"
  },
  {
    id: 106,
    name: "陶狗",
    material: "陶器",
    dynasty: "汉代",
    image: "/ancient-artifacts/文物标号/106.png"
  },
  {
    id: 107,
    name: "瓷黄釉双狗",
    material: "瓷器",
    dynasty: "宋元",
    image: "/ancient-artifacts/文物标号/107.png"
  },
  {
    id: 108,
    name: "陶绿釉狗",
    material: "陶器",
    dynasty: "汉代",
    image: "/ancient-artifacts/文物标号/108.png"
  },
  {
    id: 109,
    name: "三彩狗",
    material: "陶器",
    dynasty: "宋元",
    image: "/ancient-artifacts/文物标号/109.png"
  },
  {
    id: 110,
    name: "俞明猎犬图册",
    material: "书画",
    dynasty: "近现代",
    image: "/ancient-artifacts/文物标号/110.png"
  },
  {
    id: 111,
    name: "俞明猎犬图册",
    material: "书画",
    dynasty: "近现代",
    image: "/ancient-artifacts/文物标号/111.png"
  },
  {
    id: 112,
    name: "俞明猎犬图册",
    material: "书画",
    dynasty: "近现代",
    image: "/ancient-artifacts/文物标号/112.png"
  },
  {
    id: 113,
    name: "俞明猎犬图册",
    material: "书画",
    dynasty: "近现代",
    image: "/ancient-artifacts/文物标号/113.png"
  },
  {
    id: 114,
    name: "俞明猎犬图册",
    material: "书画",
    dynasty: "近现代",
    image: "/ancient-artifacts/文物标号/114.png"
  },
  {
    id: 115,
    name: "俞明猎犬图册",
    material: "书画",
    dynasty: "近现代",
    image: "/ancient-artifacts/文物标号/115.png"
  },
  {
    id: 116,
    name: "俞明猎犬图册",
    material: "书画",
    dynasty: "近现代",
    image: "/ancient-artifacts/文物标号/116.png"
  },
  {
    id: 117,
    name: "俞明猎犬图册",
    material: "书画",
    dynasty: "近现代",
    image: "/ancient-artifacts/文物标号/117.png"
  },
  {
    id: 118,
    name: "俞明猎犬图册",
    material: "书画",
    dynasty: "近现代",
    image: "/ancient-artifacts/文物标号/118.png"
  },
  {
    id: 119,
    name: "俞明猎犬图册",
    material: "书画",
    dynasty: "近现代",
    image: "/ancient-artifacts/文物标号/119.png"
  },
  {
    id: 120,
    name: "艾启蒙十骏犬图册",
    material: "书画",
    dynasty: "清代",
    image: "/ancient-artifacts/文物标号/120.png"
  },
  {
    id: 121,
    name: "艾启蒙十骏犬图册",
    material: "书画",
    dynasty: "清代",
    image: "/ancient-artifacts/文物标号/121.png"
  },
  {
    id: 122,
    name: "艾启蒙十骏犬图册",
    material: "书画",
    dynasty: "清代",
    image: "/ancient-artifacts/文物标号/122.png"
  },
  {
    id: 123,
    name: "艾启蒙十骏犬图册",
    material: "书画",
    dynasty: "清代",
    image: "/ancient-artifacts/文物标号/123.png"
  },
  {
    id: 124,
    name: "艾启蒙十骏犬图册",
    material: "书画",
    dynasty: "清代",
    image: "/ancient-artifacts/文物标号/124.png"
  },
  {
    id: 125,
    name: "艾启蒙十骏犬图册",
    material: "书画",
    dynasty: "清代",
    image: "/ancient-artifacts/文物标号/125.png"
  },
  {
    id: 126,
    name: "艾启蒙十骏犬图册",
    material: "书画",
    dynasty: "清代",
    image: "/ancient-artifacts/文物标号/126.png"
  },
  {
    id: 127,
    name: "艾启蒙十骏犬图册",
    material: "书画",
    dynasty: "清代",
    image: "/ancient-artifacts/文物标号/127.png"
  },
  {
    id: 128,
    name: "艾启蒙十骏犬图册",
    material: "书画",
    dynasty: "清代",
    image: "/ancient-artifacts/文物标号/128.png"
  },
  {
    id: 129,
    name: "清人栗犬图轴",
    material: "书画",
    dynasty: "清代",
    image: "/ancient-artifacts/文物标号/129.png"
  },
  {
    id: 130,
    name: "明人四犬图轴",
    material: "书画",
    dynasty: "明代",
    image: "/ancient-artifacts/文物标号/130.png"
  },
  {
    id: 131,
    name: "清人栗犬轴",
    material: "书画",
    dynasty: "清代",
    image: "/ancient-artifacts/文物标号/131.png"
  },
  {
    id: 132,
    name: "清人竹栏花犬轴",
    material: "书画",
    dynasty: "清代",
    image: "/ancient-artifacts/文物标号/132.png"
  },
  {
    id: 133,
    name: "清人花蝶黄犬轴",
    material: "书画",
    dynasty: "清代",
    image: "/ancient-artifacts/文物标号/133.png"
  },
  {
    id: 134,
    name: "“牛犬” 鼻钮铜印",
    material: "铜器",
    dynasty: "先秦",
    image: "/ancient-artifacts/文物标号/134.png"
  },
  {
    id: 135,
    name: "氏百犬牛卜辞",
    material: "其他",
    dynasty: "先秦",
    image: "/ancient-artifacts/文物标号/135.png"
  },
  {
    id: 136,
    name: "贞犬登亡祸卜辞",
    material: "其他",
    dynasty: "先秦",
    image: "/ancient-artifacts/文物标号/136.png"
  },
  {
    id: 137,
    name: "贞侑于母犬三羊三豕卯等字卜辞",
    material: "其他",
    dynasty: "先秦",
    image: "/ancient-artifacts/文物标号/137.png"
  },
  {
    id: 138,
    name: "夷白犬夷犬等字卜辞",
    material: "其他",
    dynasty: "先秦",
    image: "/ancient-artifacts/文物标号/138.png"
  },
  {
    id: 139,
    name: "贞卜侑犬亡祸卜辞",
    material: "其他",
    dynasty: "先秦",
    image: "/ancient-artifacts/文物标号/139.png"
  },
  {
    id: 140,
    name: "辛犬卜辞",
    material: "其他",
    dynasty: "先秦",
    image: "/ancient-artifacts/文物标号/140.png"
  },
  {
    id: 141,
    name: "犬卜辞",
    material: "其他",
    dynasty: "先秦",
    image: "/ancient-artifacts/文物标号/141.png"
  },
  {
    id: 142,
    name: "犬令等字卜辞",
    material: "其他",
    dynasty: "先秦",
    image: "/ancient-artifacts/文物标号/142.png"
  },
  {
    id: 143,
    name: "粉彩花狗纹碗",
    material: "瓷器",
    dynasty: "清代",
    image: "/ancient-artifacts/文物标号/143.png"
  },
  {
    id: 144,
    name: "道光款粉彩狗狮花卉纹碗",
    material: "瓷器",
    dynasty: "清代",
    image: "/ancient-artifacts/文物标号/144.png"
  },
  {
    id: 145,
    name: "道光款粉彩狮狗花卉纹碗",
    material: "瓷器",
    dynasty: "清代",
    image: "/ancient-artifacts/文物标号/145.png"
  },
  {
    id: 146,
    name: "绢画朱判猫犬图面棕竹柄团扇",
    material: "书画",
    dynasty: "清代",
    image: "/ancient-artifacts/文物标号/146.png"
  },
  {
    id: 147,
    name: "绢画朱判猫犬图面棕竹柄团扇",
    material: "书画",
    dynasty: "清代",
    image: "/ancient-artifacts/文物标号/147.png"
  },
];

