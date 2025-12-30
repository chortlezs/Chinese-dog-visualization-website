export interface PoetryData {
  id: string;
  name: string;
  value: number;
}

export const data: PoetryData[] = [
  { id: '1', name: '李白', value: 100 },
  { id: '2', name: '杜甫', value: 80 },
  { id: '3', name: '白居易', value: 60 },
  { id: '4', name: '王维', value: 40 },
  { id: '5', name: '苏轼', value: 20 },
];
