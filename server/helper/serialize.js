module.exports.serializeUser = (user) => {
    return {
        firstName: user.firstName,
        id: user._id,
        image: user.image,
        middleName: user.middleName,
        permission: user.permission,
        surName: user.surName,
        username: user.username
    }
}

module.exports.serializeNews = (news)=>{
  
  return{
    id: news.id,
    title: news.title,
    created_at: news.created_at,
    text: news.text,
    user: {
      id: news.user.id,
      username: news.user.username,
      firstName: news.user.firstName,
      middleName: news.user.middleName,
      image: news.user.image
    } 
  }  
} 


