export interface Breed {
  id: number;
  name: string;
  category: string;
  title: string;
  description: string;
  image: string;
  region: string;
}

export const breeds: Breed[] = [
  { id: 1, name: '昆明犬', category: '大', title: '中国名犬', description: '中国自主培育的优良工作犬，由云南民间狼种犬经38年精心选育而成。适应高原气候，嗅觉灵敏，广泛用于警用和搜救。', image: '/frames/list1.png', region: '西南地区' },
  { id: 2, name: '藏獒', category: '大', title: '中国名犬', description: '原产于青藏高原，世界公认的最古老、稀有的犬种。体格高大，性格刚毅，力大勇猛，护领地意识极强，被誉为“东方神犬”。', image: '/frames/list2.png', region: '西南地区' },
  { id: 3, name: '沙皮犬', category: '中', title: '中国名犬', description: '产于广东大沥，世界名犬之一。以皮肤充满褶皱、毛短而硬似沙纸为特征。性格独立沉稳，古代曾作为斗犬和猎犬。', image: '/frames/list3.png', region: '华南地区' },
  { id: 4, name: '松狮犬', category: '中', title: '中国名犬', description: '中国古老的犬种，已有2000多年历史。以独特的蓝黑色舌头和狮子般的外貌著称。性格稳重，忠诚，现多作为伴侣犬。', image: '/frames/list4.png', region: '华南地区' },
  { id: 5, name: '北京犬', category: '小', title: '中国名犬', description: '又称京巴，中国古老宫廷玩赏犬，已有四千年历史。外形高贵，毛长而华丽，性格自信、倔强，曾被视为神圣的象征。', image: '/frames/list5.png', region: '华北地区' },
  { id: 6, name: '西施犬', category: '小', title: '中国名犬', description: '起源于西藏，由拉萨犬与北京犬杂交培育。被毛长而丰富，仪态高贵，性格活泼开朗，是优秀的家庭伴侣犬。', image: '/frames/list6.png', region: '西南地区' },
  { id: 7, name: '西藏梗', category: '中', title: '中国名犬', description: '原产于西藏的古老犬种，曾被作为“幸运使者”赠送。被毛双层丰富，性格活泼、聪明，具有很强的适应能力。', image: '/frames/list7.png', region: '西南地区' },
  { id: 8, name: '拉萨狮子犬', category: '小', title: '中国名犬', description: '原产于西藏，外形酷似微型狮子。古代主要在寺院中作为警示犬，被毛长而厚重，性格坚韧，听觉敏锐。', image: '/frames/list8.png', region: '西南地区' },
  { id: 9, name: '西藏猎犬', category: '小', title: '中国名犬', description: '又称“袖狗”，原产西藏，常被僧侣饲养。性格独立自信，警觉性高，是优秀的伴侣犬和看门犬。', image: '/frames/list9.png', region: '西南地区' },
  { id: 10, name: '八哥犬', category: '小', title: '中国名犬', description: '原产于中国，富有魅力的小型犬。面部有深皱纹，性格温和、迷人，爱干净，是非常理想的家庭伴侣。', image: '/frames/list10.png', region: '全国分布' },
  { id: 11, name: '中国冠毛犬', category: '小', title: '中国名犬', description: '世界上仅有的几个无毛犬种之一。头顶有冠毛，形似清朝官帽。性格活泼洁净，温顺亲人，适合家庭饲养。', image: '/frames/list11.png', region: '全国分布' },
  { id: 12, name: '潮汕原生犬', category: '中', title: '中国地方名犬', description: '产于广东潮汕地区，俗称“大头犬”。忠诚护主，性格刚烈，适应性强，是优秀的看家护院犬。', image: '/frames/list12.png', region: '华南地区' },
  { id: 13, name: '贵州下司犬', category: '中', title: '中国地方名犬', description: '产于贵州下司镇，世界级猎犬。毛色洁白，嗅觉灵敏，爆发力强，不仅是狩猎好手，也是优秀的看家犬。', image: '/frames/list13.png', region: '西南地区' },
  { id: 14, name: '山东细犬', category: '大', title: '中国地方名犬', description: '中国古老的狩猎犬种，主要分布在山东。身形修长，奔跑速度极快，是典型的视觉猎犬，曾是皇家猎犬。', image: '/frames/list14.png', region: '华东地区' },
  { id: 15, name: '河北细犬', category: '大', title: '中国地方名犬', description: '又称“康熙御犬”，主要用于平原狩猎野兔。体型优雅，嗅觉灵敏，对主人绝对忠诚，衔取欲望强。', image: '/frames/list15.png', region: '华北地区' },
  { id: 16, name: '陕西细犬', category: '大', title: '中国地方名犬', description: '历史悠久的狩猎犬，头形似羊，主要分布在关中地区。爆发力和耐力极佳，是中国细犬中的猎兔能手。', image: '/frames/list16.png', region: '西北地区' },
  { id: 17, name: '东北猎犬', category: '中', title: '中国地方名犬', description: '主要分布于东北地区，适应寒冷气候。体魄强健，善于在丛林积雪中狩猎，性格凶猛而忠诚。', image: '/frames/list17.png', region: '东北地区' },
  { id: 18, name: '蒙古细犬', category: '大', title: '中国地方名犬', description: '又称契丹猎犬，起源于辽代。体型高大健壮，耐粗饲，搏斗能力强，是草原上全天候的综合性猎犬。', image: '/frames/list18.png', region: '华北地区' },
  { id: 19, name: '重庆犬', category: '中', title: '中国地方名犬', description: '又名川东猎犬、邻水狗，产于重庆及周边。历史悠久，性格勇敢忠诚，不仅能狩猎，也是优秀的护卫犬。', image: '/frames/list19.png', region: '西南地区' },
  { id: 20, name: '四川凉山犬', category: '中', title: '中国地方名犬', description: '产于大凉山地区，彝族猎犬。善于山地搜寻和狩猎，嗅觉灵敏，耐力好，性格凶猛，忠于主人。', image: '/frames/list20.png', region: '西南地区' },
  { id: 21, name: '莱州红犬', category: '大', title: '中国地方名犬', description: '产于山东莱州，由多种犬杂交选育而成。体型高大雄壮，运动能力强，具狼种犬特征，不仅美观且护卫能力强。', image: '/frames/list21.png', region: '华东地区' },
  { id: 22, name: '西林矮脚犬', category: '中', title: '中国地方名犬', description: '产于广西西林等地。四肢短小，身体较长，动作灵活，善于钻入洞穴驱赶猎物，性格活泼。', image: '/frames/list22.png', region: '华南地区' },
  { id: 23, name: '蒙古犬', category: '大', title: '中国地方名犬', description: '又称蒙古獒，草原牧民的忠实伙伴。体格强壮，抗病力强，勇猛彪悍，世代守护羊群，抵御狼害。', image: '/frames/list23.png', region: '华北地区' },
  { id: 24, name: '广西笔尾灰犬', category: '中', title: '中国地方名犬', description: '产于广西，因尾巴像毛笔而得名。性格凶猛但易训练，记忆力好，是优秀的山地猎犬，对主人绝对忠诚。', image: '/frames/list24.png', region: '华南地区' },
  { id: 25, name: '湖北箭毛猎犬', category: '中', title: '中国地方名犬', description: '产于湖北黄石等地。被毛短而硬，形似箭羽，故名。嗅觉灵敏，动作敏捷，是优秀的狩猎帮手。', image: '/frames/list25.png', region: '华中地区' },
  { id: 26, name: '虎斑犬', category: '中', title: '中国地方名犬', description: '中国本土珍稀犬种，曾分布于江西等地。毛色呈虎斑状，性格凶猛，忠诚护主，善于独立捕猎小型猎物。', image: '/frames/list26.png', region: '不详' },
  { id: 27, name: '鄂伦春猎犬', category: '中', title: '中国地方名犬', description: '鄂伦春族猎人的好帮手，适应大兴安岭森林环境。体型适中，善于追踪和围捕猎物，耐力持久。', image: '/frames/list27.png', region: '华北地区' },
  { id: 28, name: '四川青川犬', category: '中', title: '中国地方名犬', description: '产于四川青川县。体型中等，耐力极好，善于在山区丛林中围猎，声音洪亮，是优秀的山地猎犬。', image: '/frames/list28.png', region: '西南地区' },
  { id: 29, name: '中国福犬', category: '小', title: '中国地方名犬', description: '中国古老的祈福犬，形象威严而神秘。相传能带来好运，历史悠久，常被视为吉祥的象征。', image: '/frames/list29.png', region: '西北地区' },
  { id: 30, name: '中国太行犬', category: '大', title: '中国地方名犬', description: '产于太行山脉，北方优良的本土犬种。适应山地环境，体格强健，忠诚可靠，看家护院能力强。', image: '/frames/list30.png', region: '华北地区' },
  { id: 31, name: '板凳狗', category: '大', title: '中国地方名犬', description: '常见于民间，因体型较矮长类似板凳而得名。性格温顺，忠实看家，是农村常见的守卫犬。', image: '/frames/list31.png', region: '不详' },
  { id: 32, name: '靴子犬', category: '大', title: '中国地方名犬', description: '因四肢下部毛色雪白，宛如穿着靴子而得名（也称踏雪）。外形独特，常见于传统中华田园犬中。', image: '/frames/list32.png', region: '华北地区' },
  { id: 33, name: '太仓犬', category: '小', title: '中国地方名犬', description: '产于江苏太仓。体型小巧，反应灵敏，善于捕捉老鼠和小型猎物，是当地著名的捕鼠能手。', image: '/frames/list33.png', region: '华东地区' },
  { id: 34, name: '哈萨克牧羊犬', category: '大', title: '中国地方名犬', description: '又称天山獒，哈萨克族牧民的得力助手。体型巨大，适应严寒，性格勇猛，守护羊群免受野兽侵袭。', image: '/frames/list34.png', region: '西北地区' },
  { id: 35, name: '黑龙犬', category: '大', title: '中国地方名犬', description: '产于黑龙江流域，适应极寒气候。体型高大，性格凶猛，忠诚度高，是优秀的护卫犬和工作犬。', image: '/frames/list35.png', region: '东北地区' },
  { id: 36, name: '中国田园犬', category: '中', title: '中国田园犬', description: '统称“土狗”，中华大地上分布最广的犬种。性格温顺忠诚，适应性极强，是历史悠久的看家护院好帮手。', image: '/frames/list36.png', region: '全国分布' },
];
