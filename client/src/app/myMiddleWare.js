export const one = (storeApi) => {
    return (next) => {
        return (action) => {
            
            
            next(action)
            console.log(storeApi.getState())
        }
    }
}
