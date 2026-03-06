'use client';
import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { artifacts, Artifact } from './data';

const ArtifactCard = ({ 
  artifact, 
  selectedDynasty, 
  onClick 
}: { 
  artifact: Artifact, 
  selectedDynasty: string | null,
  onClick: (artifact: Artifact) => void 
}) => {
  const isMatch = selectedDynasty ? artifact.dynasty.includes(selectedDynasty) : false;
  const isDimmed = selectedDynasty && !isMatch;

  return (
    <div 
      onClick={() => onClick(artifact)}
      className={`group relative w-11 h-11 rounded cursor-pointer transition-all duration-300 flex-shrink-0 ${
      isDimmed 
        ? 'opacity-20 grayscale scale-90' 
        : isMatch 
          ? 'bg-[#FF9000]/40 ring-1 ring-[#FF9000] scale-105 z-30' 
          : 'bg-black/20 hover:bg-[#FF9000]/20'
    }`}>
      <img 
        src={artifact.image} 
        alt={artifact.name}
        className={`w-full h-full object-contain p-0.5 transition-opacity duration-300 ${
          selectedDynasty ? 'opacity-100' : 'opacity-70 group-hover:opacity-100'
        }`}
      />
      {!isDimmed && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-black/90 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50 border border-white/20">
          {artifact.name}
        </div>
      )}
    </div>
  );
};

export default function AncientPage() {
  const router = useRouter();
  const [selectedDynasty, setSelectedDynasty] = useState<string | null>(null);
  const [selectedArtifact, setSelectedArtifact] = useState<Artifact | null>(null);

  const dynasties = ['先秦', '汉代', '魏晋南北朝', '隋唐', '宋元', '明', '清', '近现代'];

  // Group artifacts by material
  const groupedArtifacts = useMemo(() => {
    const groups: { [key: string]: Artifact[] } = {};
    artifacts.forEach(artifact => {
      if (!groups[artifact.material]) {
        groups[artifact.material] = [];
      }
      groups[artifact.material].push(artifact);
    });
    return groups;
  }, []);

  const materials = Object.keys(groupedArtifacts);

  const dynastyDescriptions: { [key: string]: string } = {
    '先秦': '商代狗为神权祭祀载体；战国狗价与实用挂钩，成为生产助手，开启从神坛向生活的过渡。',
    '汉代': '汉代狗价平民化，延续实用属性，活殉消失，陶狗盛行，成为民生伙伴，完成向生活工具的转变。',
    '魏晋南北朝': '魏晋南北朝狗价与汉代相近，等级分化初现；社会动荡致厚葬简化，狗仍为实用工具，存在感弱化。',
    '隋唐': '隋唐的狗价等级分化显著，形成贵族观赏、民间实用二元格局，开启身份属性新篇章。',
    '宋元': '宋代狗价平民化，融入市井成宠物；元代狗价回落，实用功能凸显，衔接宋与明清格局。',
    '明': '明代狗价等级分化强化，延续二元格局；观赏狗延伸至文人，情感陪伴属性初现。',
    '清': '清代狗价等级分化达顶峰，延续二元格局；民间狗转向生活陪伴，情感联结深化，推动向生活伙伴转变。',
    '近现代': '近现代狗价市场化，等级溢价缩小；狗彻底成为家庭宠物，完成从神权载体到生活伙伴的演变闭环。'
  };

  const dynastyImages: { [key: string]: string } = {
    '先秦': '/frames/datamap1.png',
    '汉代': '/frames/datamap2.png',
    '魏晋南北朝': '/frames/datamap3.png',
    '隋唐': '/frames/datamap4.png',
    '宋元': '/frames/datamap5.png',
    '明': '/frames/datamap6.png',
    '清': '/frames/datamap7.png',
    '近现代': '/frames/datamap8.png'
  };

  const dynastyArtifacts: { [key: string]: string } = {
    '先秦': '/frames/ancient1.png',
    '汉代': '/frames/ancient2.png',
    '魏晋南北朝': '/frames/ancient3.png',
    '隋唐': '/frames/ancient4.png',
    '宋元': '/frames/ancient5.png',
    '明': '/frames/ancient6.png',
    '清': '/frames/ancient7.png',
    '近现代': '/frames/ancient8.png'
  };

  return (
    <div className="w-full min-h-screen" style={{ backgroundColor: '#00100A' }}>
      {/* side 图片始终固定在画面最上方 */}
      <div 
        className="fixed top-0 left-0 w-full h-full pointer-events-none"
        style={{
          zIndex: 10,
        }}
      >
        <img
          src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/frames/side.png`}
          alt="Side"
          className="w-full h-full"
          style={{
            display: 'block',
            objectFit: 'fill', // 强制拉伸填满
          }}
          draggable={false}
        />
      </div>

      {/* top 图片固定在画面最上方，位于 side 之下 */}
      <div 
        className="fixed top-0 left-0 w-full pointer-events-none"
        style={{
          zIndex: 5, // 低于 side.png (zIndex 10)
        }}
      >
        <img
          src="/frames/top.png"
          alt="Top Decoration"
          className="w-full h-auto"
          style={{
            display: 'block',
            width: '100%',
            height: 'auto',
          }}
          draggable={false}
        />
      </div>

      <div className="container mx-auto px-14 pt-20 h-screen flex flex-col gap-4 pb-6 relative z-[2] box-border">
        
        {/* 上方区域：标题 */}
        <div className="flex-none h-24 flex items-center justify-between relative">
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 h-full w-2/3 flex justify-center items-center">
            <img 
              src="/frames/subtitle4.png" 
              alt="中国古代犬文化遗存" 
              className="h-full w-auto object-contain scale-125"
            />
          </div>
          <div className="w-1/3"></div> {/* Spacer for left balance if needed, or just empty */}
          <div className="text-[#ededed]/60 text-sm ml-auto z-10">
             文物总数：{artifacts.length} 件
          </div>
        </div>

        {/* 下方主体内容区域：左侧 + 右侧 */}
        <div className="flex-grow flex gap-6 overflow-hidden min-h-0 relative z-50">
          {/* 左侧区域：包含文物展示区和时间轴 */}
          <div className="flex-1 flex flex-col w-3/4 min-h-0">
            {/* 左上方：主体矩形（文物展示区） */}
            <div className="flex-grow relative flex flex-col gap-4 overflow-hidden pb-4">
               <div className="flex-1 flex gap-1 h-full">
                {/* 第一列：陶器 (数量最多，占据最大空间) */}
                <div className="w-[410px] shrink-0 bg-white/5 rounded-lg p-3 border border-white/10 backdrop-blur-sm flex flex-col min-w-0">
                  <h3 className="text-[#FF9000] text-base font-bold mb-2 border-b border-white/10 pb-1 flex justify-between items-center shrink-0">
                    陶器
                    <span className="text-xs text-gray-400 font-normal">{groupedArtifacts['陶器']?.length || 0}件</span>
                  </h3>
                  <div className="flex-1 min-h-0 flex flex-wrap content-start gap-1">
                    {groupedArtifacts['陶器']?.map(artifact => (
                      <ArtifactCard key={artifact.id} artifact={artifact} selectedDynasty={selectedDynasty} onClick={setSelectedArtifact} />
                    ))}
                  </div>
                </div>

                {/* 第二列：书画 + 瓷器 (中等数量) */}
                <div className="w-[410px] shrink-0 flex flex-col gap-1 min-w-0">
                  {/* 书画区域 */}
                  <div className="flex-[3] bg-white/5 rounded-lg p-3 border border-white/10 backdrop-blur-sm flex flex-col min-h-0">
                    <h3 className="text-[#FF9000] text-base font-bold mb-2 border-b border-white/10 pb-1 flex justify-between items-center shrink-0">
                      书画
                      <span className="text-xs text-gray-400 font-normal">{groupedArtifacts['书画']?.length || 0}件</span>
                    </h3>
                    <div className="flex-1 min-h-0 flex flex-wrap content-start gap-1">
                      {groupedArtifacts['书画']?.map(artifact => (
                        <ArtifactCard key={artifact.id} artifact={artifact} selectedDynasty={selectedDynasty} onClick={setSelectedArtifact} />
                      ))}
                    </div>
                  </div>
                  {/* 瓷器区域 */}
                  <div className="flex-[2] bg-white/5 rounded-lg p-3 border border-white/10 backdrop-blur-sm flex flex-col min-h-0">
                    <h3 className="text-[#FF9000] text-base font-bold mb-2 border-b border-white/10 pb-1 flex justify-between items-center shrink-0">
                      瓷器
                      <span className="text-xs text-gray-400 font-normal">{groupedArtifacts['瓷器']?.length || 0}件</span>
                    </h3>
                    <div className="flex-1 min-h-0 flex flex-wrap content-start gap-1">
                      {groupedArtifacts['瓷器']?.map(artifact => (
                        <ArtifactCard key={artifact.id} artifact={artifact} selectedDynasty={selectedDynasty} onClick={setSelectedArtifact} />
                      ))}
                    </div>
                  </div>
                </div>

                {/* 第三列：其他小类别 (数量少，垂直堆叠) */}
                <div className="w-[215px] shrink-0 flex flex-col gap-1 min-w-0">
                  {/* 铜器 */}
                  <div className="flex-[1.3] bg-white/5 rounded-lg p-3 border border-white/10 backdrop-blur-sm flex flex-col min-h-0">
                    <h3 className="text-[#FF9000] text-base font-bold mb-2 border-b border-white/10 pb-1 flex justify-between items-center shrink-0">
                      铜器
                      <span className="text-xs text-gray-400 font-normal">{groupedArtifacts['铜器']?.length || 0}件</span>
                    </h3>
                    <div className="flex-1 min-h-0 flex flex-wrap content-start gap-1">
                      {groupedArtifacts['铜器']?.map(artifact => (
                        <ArtifactCard key={artifact.id} artifact={artifact} selectedDynasty={selectedDynasty} onClick={setSelectedArtifact} />
                      ))}
                    </div>
                  </div>
                  {/* 其他 */}
                  <div className="flex-[2.2] bg-white/5 rounded-lg p-3 border border-white/10 backdrop-blur-sm flex flex-col min-h-0">
                    <h3 className="text-[#FF9000] text-base font-bold mb-2 border-b border-white/10 pb-1 flex justify-between items-center shrink-0">
                      其他
                      <span className="text-xs text-gray-400 font-normal">{groupedArtifacts['其他']?.length || 0}件</span>
                    </h3>
                    <div className="flex-1 min-h-0 flex flex-wrap content-start gap-1">
                      {groupedArtifacts['其他']?.map(artifact => (
                        <ArtifactCard key={artifact.id} artifact={artifact} selectedDynasty={selectedDynasty} onClick={setSelectedArtifact} />
                      ))}
                    </div>
                  </div>
                  {/* 木器 */}
                  <div className="flex-[0.8] bg-white/5 rounded-lg p-3 border border-white/10 backdrop-blur-sm flex flex-col min-h-0">
                    <h3 className="text-[#FF9000] text-base font-bold mb-2 border-b border-white/10 pb-1 flex justify-between items-center shrink-0">
                      木器
                      <span className="text-xs text-gray-400 font-normal">{groupedArtifacts['木器']?.length || 0}件</span>
                    </h3>
                    <div className="flex-1 min-h-0 flex flex-wrap content-start gap-1">
                      {groupedArtifacts['木器']?.map(artifact => (
                        <ArtifactCard key={artifact.id} artifact={artifact} selectedDynasty={selectedDynasty} onClick={setSelectedArtifact} />
                      ))}
                    </div>
                  </div>
                </div>
             </div>
            </div>

          {/* 左下方：扁矩形（时间轴） */}
          <div className="h-36 relative">
             <div className="relative mt-4">
               {/* Line - 垂直居中于图标 (图标高度w-20=5rem=80px，中心为2.5rem=top-10) */}
               <div className="absolute top-10 left-0 w-full h-0.5 bg-[#FF9000]/30 -translate-y-1/2" />
               
               {/* Points */}
               <div className="relative z-10 flex justify-between items-start w-full px-4">
                 {dynasties.map((dynasty, index) => (
                   <div 
                    key={index} 
                    className="flex flex-col items-center gap-3 cursor-pointer group"
                    onClick={() => setSelectedDynasty(dynasty)}
                   >
                     {/* 图片容器 */}
                     <div className="relative w-20 h-20 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                          <img 
                            src={selectedDynasty === dynasty ? "/frames/selected.png" : "/frames/unselected.png"}
                            alt={dynasty}
                            className="w-full h-full object-contain"
                          />
                     </div>
                     <span className={`text-sm font-medium transition-colors ${selectedDynasty === dynasty ? 'text-[#FF9000]' : 'text-[#ededed] group-hover:text-[#FF9000]'}`}>
                       {dynasty}
                     </span>
                   </div>
                 ))}
               </div>
             </div>
          </div>
        </div>

        {/* 右侧区域：长的窄的矩形（解释区） */}
          <div className="w-1/4 relative flex flex-col gap-4 overflow-y-auto min-h-0 z-50">
             {/* 上方：气泡框区 */}
             <div className="flex-grow flex flex-col pb-4 min-h-0">
               <div className="w-full bg-black border border-[#34817A] rounded-lg p-4 relative flex flex-col gap-3 mt-auto">
                  {/* 气泡小三角 */}
                  <div className="absolute -bottom-2 right-8 w-4 h-4 bg-black border-r border-b border-[#34817A] rotate-45 transform translate-y-1/2"></div>
                  
                  {/* 气泡内容：上图下文 */}
                  <div className="flex flex-col gap-3 overflow-y-auto min-h-0 custom-scrollbar pr-1">
                    {/* 图片展示 */}
                    <div className="w-full h-48 bg-black/20 rounded flex items-center justify-center overflow-hidden shrink-0">
                      {selectedDynasty ? (
                        <img 
                          src={dynastyImages[selectedDynasty]} 
                          alt={`${selectedDynasty} datamap`}
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <div className="text-gray-500 text-sm">请选择时间轴节点</div>
                      )}
                    </div>
                    {/* 文字解释 */}
                    <div className="text-[#ededed] text-sm leading-relaxed">
                      {selectedDynasty ? dynastyDescriptions[selectedDynasty] : '请点击时间轴节点查看详情'}
                    </div>
                  </div>
               </div>
             </div>
             
             {/* 下方：照片区 */}
             <div className="w-full shrink-0">
               <img 
                 src="/frames/dogman.png" 
                 alt="Dogman" 
                 className="w-full h-auto object-contain rounded-lg"
               />
             </div>
          </div>
        </div>
      </div>

      {/* Artifact Modal */}
      {selectedArtifact && (
        <div 
          className="fixed inset-0 bg-black/80 z-[100] flex items-center justify-center p-10"
          onClick={() => setSelectedArtifact(null)}
        >
          <div 
            className="bg-[#00100A] border border-[#34817A] rounded-xl p-6 max-w-4xl w-full max-h-full overflow-y-auto relative flex flex-col gap-4 shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <button 
              className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors"
              onClick={() => setSelectedArtifact(null)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <h2 className="text-2xl font-bold text-[#FF9000] text-center border-b border-[#34817A]/30 pb-4">
              {selectedArtifact.name}
            </h2>
            
            <div className="flex-1 flex items-center justify-center min-h-0 overflow-hidden bg-black/20 rounded-lg p-4">
              <img 
                src={selectedArtifact.image} 
                alt={selectedArtifact.name} 
                className="max-w-full max-h-[70vh] object-contain"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-center text-[#ededed]/80 text-sm pt-2">
              <div className="bg-white/5 rounded p-2">
                <span className="text-[#34817A]">朝代：</span>{selectedArtifact.dynasty}
              </div>
              <div className="bg-white/5 rounded p-2">
                <span className="text-[#34817A]">材质：</span>{selectedArtifact.material}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 向下箭头：跳转到诗词板块 */}
      <div
        className="fixed bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer animate-bounce"
        style={{ zIndex: 50 }}
        onClick={() => router.push('/poetry')}
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24" 
          strokeWidth={1.5} 
          stroke="#ededed" 
          className="w-12 h-12"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </div>
    </div>
  );
}