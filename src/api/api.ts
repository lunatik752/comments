export type AuthorApiType = {
    id: number
    name: string
}

export type PostApiType ={
    id: number
    text: string
    likes: number
    author: AuthorApiType
}


export const api = {
    getPosts(): Promise<PostApiType[]> {
        return new Promise((res) => {
            setTimeout(() => {
                res([
                    {
                        id: 1,
                        text: 'Hello friends!',
                        likes: 12,
                        author: {id: 1, name: 'Max'}
                    },
                    {
                        id: 2,
                        text: 'I like React',
                        likes: 111,
                        author: {id: 2, name: 'Kna'}

                    },
                    {
                        id: 3,
                        text: 'I like Angular',
                        likes: 111,
                        author: {id: 1, name: 'Max'}

                    },
                ])
            }, 2000)
        })
    },
    updatePost(postId: number, text: string) {
        return Promise.resolve({})
    },
    updateAuthor(authorId: number, authorName: string) {
        return Promise.resolve({})
    }
}
