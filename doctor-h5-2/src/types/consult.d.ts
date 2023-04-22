import { ConsultType, IllnessTime } from '@/enums'
import { Knowledge } from './consult.d'

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

// 医生卡片对象
export interface Doctor {
  /** 医生头像 */
  avatar: string;
  consultationNum: number;
  /** 科室名称 */
  depName: string;
  /** 医院等级-名称简写 */
  gradeName: string;
  /** 医院名称 */
  hospitalName: string;
  /** 医生id */
  id: string;
  /** 未登录用户默认返回0，登录用户实际判断是否关注的标志1已关注0未关注 */
  likeFlag?: number;
  major: string;
  /** 医生姓名 */
  name: string;
  /** 职称 */
  positionalTitles: string;
  score: number;
  /** 接诊费用 */
  serviceFee: number;
}

/** 关注的类型，doc医生 knowledge文章 topic百科话题 disease疾病 */
export type FollowType = "doc" | "knowledge" | "topic" | "disease";

/** 图片列表 */
export type Image = {
  /** 图片ID */
  id: string
  /** 图片地址 */
  url: string
}
/** 问诊记录 */
export type Consult = {
  /** 问诊记录ID */
  id: string
  /** 问诊类型 */
  type: ConsultType
  /** 快速问诊类型，0 普通 1 三甲 */
  illnessType: 0 | 1
  /** 科室ID */
  depId: string
  /** 疾病描述 */
  illnessDesc: string
  /** 疾病持续时间 */
  illnessTime: IllnessTime
  /** 是否就诊过，0 未就诊过  1 就诊过 */
  consultFlag: 0 | 1
  /** 图片数组 */
  pictures: Image[]
  /** 患者ID */
  patientId: string
  /** 优惠券ID */
  couponId: string
}

/** 问诊记录-全部可选 */
export type PartialConsult = Partial<Consult>

export interface TopDep {
  /**
   * 子级集合
   */
  child?: Child[]
  /**
   * 科室id--一级科室
   */
  id?: string
  /**
   * 科室名称
   */
  name?: string
}

export interface SubDep {
  /**
   * 科室的图标
   */
  avatar: Avatar
  /**
   * 子级id
   */
  id: string
  /**
   * 子级name
   */
  name: string
}

export type ConsultIllness = Pick<
  PartialConsult,
  'illnessDesc' | 'illnessTime' | 'consultFlag' | 'pictures'
>

/** 问诊订单预支付信息 */
export interface OrderPreData {
  /** 实付金额 */
  actualPayment: number
  /** 优惠券抵扣 */
  couponDeduction: number
  /** 使用的优惠券id-使用优惠券时，返回 */
  couponId?: string
  /** 极速问诊类型：0普通1三甲,极速问题必须有值 */
  illnessType?: number
  /** 应付款/价格-图文或者极速的费用，极速普通10元，三甲39元 */
  payment: number
  /** 积分可抵扣 */
  pointDeduction: number
  /** 1问医生2极速问诊2开药问诊--默认是1 */
  type?: number
}

/** 请求订单支付信息的参数 */
export type OrderPreParams = Pick<OrderPreData, 'type' | 'illnessType'>

/** 问诊订单单项信息 */
export type ConsultOrderItem = Consult & {
  /** 创建时间 */
  createTime: string
  /** 医生信息 */
  docInfo?: Doctor
  /** 患者信息 */
  patientInfo: Patient
  /** 订单编号 */
  orderNo: string
  /** 订单状态 */
  status: OrderType
  /** 状态文字 */
  statusValue: string
  /** 类型问诊文字 */
  typeValue: string
  /** 倒计时时间 */
  countdown: number
  /** 处方ID */
  prescriptionId?: string
  /** 评价ID */
  evaluateId: number
  /** 应付款 */
  payment: number
  /** 优惠券抵扣 */
  couponDeduction: number
  /** 积分抵扣 */
  pointDeduction: number
  /** 实付款 */
  actualPayment: number
}

