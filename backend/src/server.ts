import app from './app'

const PORT = process.env.PORT || 8001


app.listen(PORT,()=>{
    console.log(`server start at ${PORT}`)
})