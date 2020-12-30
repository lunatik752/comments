export type AuthorType = {
    id: number
    name: string
}

export type PostType ={
    id: number
    text: string
    likes: number
    author: AuthorType
}


export const api = {
    getPosts(): Promise<PostType[]> {
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
                ])
            }, 2000)
        })
    },
    updatePost(postId: number, text: string) {
return Promise.resolve({})
    }
}
