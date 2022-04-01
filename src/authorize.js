/**
 * 
 * @param {string[]} roles 
 * @returns 
 */
function authorize(roles){
    return (req, res, next)=>{
        if(roles.includes(req.user.role)){
            return next()
        }

        return res.status(403).json({error: 'Your do not have enough permission'})
    }
}

module.exports = authorize;