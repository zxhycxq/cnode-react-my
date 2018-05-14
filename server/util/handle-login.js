const router =require('express').Router()
const axios =require('axios')

const baseUrl='heep://cnodejs.org/api/v1'

router.post('/login',function (req,res,next) {
  axios.post(`${baseUrl}/accesstoken`,{
    accesstoken:req.body.accessToken
       })
      .then(resp =>{
          if(resp.state===200 && resp.data.success){
            resp.session.user = {
              accessToken: req.body.accessToken,
              loginName:resp.data.loginname,
              id:resp.data.id,
              avatarUrl:resp.data.avatar_url
            }
            res.json({
              sucess:true,
              data:resp.data
            })
          }
  })
      .catch(err=>{
        if(err.response){
          res.json({
            success:false,
            data:err.response
          })
        }else{
          next(err)
        }
      })
})

module.exports=router
