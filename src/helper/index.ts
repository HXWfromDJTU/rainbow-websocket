export function isNotifyMsg (msgObj: any): boolean {
  const notifyKeys = ['jsonrpc', 'id', 'event']

  // 检查是否符合所有的 IRequest Key
  return notifyKeys.every((requestKey: string) => {
    return  msgObj.hasOwnProperty(requestKey)
  })
}
