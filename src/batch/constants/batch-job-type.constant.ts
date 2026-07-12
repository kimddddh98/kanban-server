export const BATCH_JOB_TYPE = {
  /** 유저 더미 데이터를 대량 생성하는 배치 */
  USER_SEED: 'USER_SEED',
  /** 기존 유저 데이터를 대량 수정하는 배치 */
  USER_BULK_UPDATE: 'USER_BULK_UPDATE',
} as const;

export type BatchJobType = (typeof BATCH_JOB_TYPE)[keyof typeof BATCH_JOB_TYPE];
