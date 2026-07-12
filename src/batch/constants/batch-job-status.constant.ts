export const BATCH_JOB_STATUS = {
  /** 작업이 생성됐지만 아직 실행되지 않은 상태 */
  PENDING: 'PENDING',
  /** 작업이 현재 실행 중인 상태 */
  RUNNING: 'RUNNING',
  /** 전체 대상이 모두 성공한 상태 */
  SUCCESS: 'SUCCESS',
  /** 일부 대상은 성공했고 일부 대상은 실패한 상태 */
  PARTIAL_SUCCESS: 'PARTIAL_SUCCESS',
  /** 작업 자체가 실패했거나 성공한 대상이 없는 상태 */
  FAILED: 'FAILED',
} as const;

export type BatchJobStatus =
  (typeof BATCH_JOB_STATUS)[keyof typeof BATCH_JOB_STATUS];
