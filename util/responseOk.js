module.exports.responseOk = (object, name) => {
   const count = Array.isArray(object) ? object.length : undefined
   return {
      data: {
         [name]: object,
      },
      success: true,
      count,
   }
}
