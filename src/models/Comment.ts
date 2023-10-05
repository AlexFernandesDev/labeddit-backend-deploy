export interface CommentDB {
    id: string,
    content: string,
    post_id: string,
    creator_id: string,
    created_at: string,
    creator_name?: string
}

export interface CommentModel {
    id: string,
    content: string,
    postId: string;
    createdAt: string,
    creator: {
        id: string,
        name: string
    },
}

export interface CommentDBWithCreatorName {
    id: string;
    content: string;
    post_id: string;
    creator_id: string;
    created_at: string;
    
}

export class Comment {
    constructor(
        public id: string,
        public content: string,
        public postId: string,
        public createdAt: string,
        public creatorId: string,
        public creatorName: string 
    ) {}
    
    public getId(): string {
        return this.id;
    }

    public setId(value: string) {
        this.id = value;
    }

    public getContent(): string {
        return this.content;
    }

    public setContent(value: string) {
        this.content = value;
    }

    public getPostId(): string {
        return this.postId;
    }

    public setPostId(value: string) {
        this.postId = value;
    }

    public getCreatedAt(): string {
        return this.createdAt;
    }

    public setCreatedAt(value: string) {
        this.createdAt = value;
    }

    public getCreatorId(): string {
        return this.creatorId;
    }

    public setCreatorId(value: string) {
        this.creatorId = value;
    }

    public getCreatorName(): string {
        return this.creatorName;
    }

    public setCreatorName(value: string) {
        this.creatorName = value;
    }

    public toDbModel = (): CommentDB  => {
        return {
            id: this.id,
            content: this.content,
            post_id: this.postId,
            creator_id: this.creatorId,
            created_at: this.createdAt         
        };
    }
    
    public toBusinessModel = (): CommentModel => {
        return {
            id: this.id,
            content: this.content,
            postId: this.postId,
            createdAt: this.createdAt,
            creator: {
                id: this.creatorId,
                name: this.creatorName
            },
        }
    }
    
    
}
