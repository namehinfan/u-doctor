/** 文章类型，recommend推荐，fatReduction减脂，food健康饮食，like关注医生页面文章 */
export type KnowledgeType = "like" | "recommend" | "fatReduction" | "food";

/** 文章列表查询参数 */
export type KnowledgeParams = {
  type: KnowledgeType;
  current: number;
  pageSize: number;
}

export interface KnowledgePage {
  /** 总页数 */
  pageTotal: number;
  /** 数据 */
  rows: Knowledge[];
  /** 总条数 */
  total: number;
}

export interface Knowledge {
  /** 收藏数量 */
  collectionNumber: number;
  /** 评论数量 */
  commentNumber: number;
  /** 内容详情 */
  content: string;
  /** 封面地址 */
  coverUrl: string[];
  /** 创建人头像 */
  creatorAvatar: string;
  /** 创建人科室 */
  creatorDep: string;
  /** 创建人医院 */
  creatorHospatalName: string;
  /** 创建人id */
  creatorId: string;
  /** 创建人姓名 */
  creatorName: string;
  /** 创建人职称 */
  creatorTitles: string;
  /** 文章id */
  id: string;
  /** 是否关注0未关注1关注 */
  likeFlag: number;
  /** 文章标题 */
  title: string;
  /** 百科关联的话题 */
  topic: string;
}