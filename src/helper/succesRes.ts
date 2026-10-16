export function successRes(data: object, statusCode: number = 200){
    return {
        message: 'success',
        statusCode,
        data
    }
}

