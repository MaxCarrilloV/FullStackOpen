const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) =>{
    return blogs.length === 0 
    ? 0 
    : blogs.reduce((sum,blog) => sum + blog.likes,0)
}

const favoriteBlog = (blogs) =>{
    return blogs.length === 0
    ? {}
    : blogs.filter(b => b.likes === Math.max(...blogs.map(blog => blog.likes)))[0]
}

const mostBlogs = (blogs) =>{
    if(blogs.length === 0){
        return {}
    }else if(blogs.length < 2){
        return {author: blogs[0].author,blogs:1}
    }else{
        let count = 0
        let author = ''
        for(let i=0;i<blogs.length;i++){
            let suma = blogs.filter(b => b.author===blogs[i].author).length
            if(suma > count){
                count = suma
                author = blogs.filter(b => b.author===blogs[i].author)[0].author
            }
        }
        return {author:author,blogs:count}
    }
}

const mostLikes = (blogs) => {
    if(blogs.length === 0){
        return {}
    }else if(blogs.length < 2){
        return {author: blogs[0].author,likes:blogs[0].likes}
    }else{
        let count = 0
        let author = ''
        for(let i=0;i<blogs.length;i++){
            let b = blogs.filter(b => b.author===blogs[i].author)
            let suma = b.reduce((sum,b) => sum + b.likes,0)
            if(suma > count){
                count = suma
                author = blogs.filter(b => b.author===blogs[i].author)[0].author
            }
        }
        return {author:author,likes:count}
    }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}