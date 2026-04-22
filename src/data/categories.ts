export type CategoryId = 'weight' | 'hair' | 'menopause' | 'skincare'

export interface ServiceCategory {
  id: CategoryId
  labelEn: string
  labelJa: string
  subtitleEn: string
  subtitleJa: string
  keywordsEn: string[]
  keywordsJa: string[]
  accentColor: string
  bgColor: string
}

export const CATEGORIES: ServiceCategory[] = [
  {
    id: 'weight',
    labelEn: 'Weight Management',
    labelJa: '体重管理',
    subtitleEn: 'GLP-1 & Metabolic Care',
    subtitleJa: 'GLP-1・代謝ケア',
    keywordsEn: ['Weight loss', 'GLP-1', 'Metabolism'],
    keywordsJa: ['体重が気になる', 'GLP-1治療', '代謝改善'],
    accentColor: 'text-emerald-600',
    bgColor: 'bg-accent-teal',
  },
  {
    id: 'hair',
    labelEn: 'Hair Loss',
    labelJa: '抜け毛・薄毛',
    subtitleEn: 'Scalp & Hair Restoration',
    subtitleJa: 'スカルプケア',
    keywordsEn: ['Hair thinning', 'Scalp care', 'Minoxidil'],
    keywordsJa: ['抜け毛が増えた', '薄毛が気になる', 'ミノキシジル'],
    accentColor: 'text-purple-600',
    bgColor: 'bg-accent-purple',
  },
  {
    id: 'menopause',
    labelEn: 'Menopause',
    labelJa: '更年期',
    subtitleEn: 'Hormone Balance & Relief',
    subtitleJa: 'ホルモンバランスケア',
    keywordsEn: ['Hot flashes', 'HRT', 'Hormone balance'],
    keywordsJa: ['ほてり・のぼせ', 'ホルモン補充', '更年期症状'],
    accentColor: 'text-pink-600',
    bgColor: 'bg-bg-warm',
  },
  {
    id: 'skincare',
    labelEn: 'Medical Skincare',
    labelJa: '医療スキンケア',
    subtitleEn: 'Prescription-grade Skin',
    subtitleJa: '処方スキンケア',
    keywordsEn: ['Acne', 'Brightening', 'Anti-aging'],
    keywordsJa: ['ニキビ・シミ', 'トレチノイン', 'アンチエイジング'],
    accentColor: 'text-blue-600',
    bgColor: 'bg-accent-blue',
  },
]

export function getCategoryById(id: string): ServiceCategory | undefined {
  return CATEGORIES.find(c => c.id === id)
}
