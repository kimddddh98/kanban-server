export const BATCH_JOB_FAILURE_STATUS = {
  /** 개별 대상 처리가 실패했고 아직 재시도되지 않은 상태 */
  FAILED: 'FAILED',
  /** 실패한 대상을 다시 처리 중인 상태 */
  RETRYING: 'RETRYING',
  /** 재시도 후 성공한 상태 */
  SUCCESS: 'SUCCESS',
  /** 재시도 한도를 넘었거나 재처리 불가능한 상태 */
  GIVE_UP: 'GIVE_UP',
} as const;

export type BatchJobFailureStatus =
  (typeof BATCH_JOB_FAILURE_STATUS)[keyof typeof BATCH_JOB_FAILURE_STATUS];
