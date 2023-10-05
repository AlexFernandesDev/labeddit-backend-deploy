import { PostDB, PostDBWithCreatorName } from "../models/Post";
import { BaseDatabase } from "./BaseDatabase";
import { UserDatabase } from "./UserDatabase";
import { likeDislikeDB, POST_LIKE } from "../models/Post";
import { CommentDB } from "../models/Comment";

export class PostDatabase extends BaseDatabase {
    public static TABLE_POSTS = "posts"
    public static TABLE_LIKES_DISLIKES = "likes_dislikes"
    public static TABLE_COMMENTS = "comments"

    public insertPost = async (postDB: PostDB): Promise<void> => {
        await BaseDatabase
            .connection(PostDatabase.TABLE_POSTS)
            .insert(postDB)
    }

    public getPostsWithCreatorName = async (): Promise<PostDBWithCreatorName[]> => {
        const postsDB = await BaseDatabase
            .connection(PostDatabase.TABLE_POSTS)
            .select(
                `${PostDatabase.TABLE_POSTS}.id`,
                `${PostDatabase.TABLE_POSTS}.creator_id`,
                `${PostDatabase.TABLE_POSTS}.content`,
                `${PostDatabase.TABLE_POSTS}.likes`,
                `${PostDatabase.TABLE_POSTS}.dislikes`,
                `${PostDatabase.TABLE_POSTS}.created_at`,
                `${PostDatabase.TABLE_POSTS}.updated_at`,
                `${UserDatabase.TABLE_USERS}.name as creator_name`,
                `${PostDatabase.TABLE_POSTS}.comment_count`,
            )
            .join(
                `${UserDatabase.TABLE_USERS}`,
                `${PostDatabase.TABLE_POSTS}.creator_id`,
                "=",
                `${UserDatabase.TABLE_USERS}.id`
            )

        return postsDB as PostDBWithCreatorName[]
    }

    public findPostById = async (id: string): Promise<PostDB | undefined> => {
        const [result] = await BaseDatabase
            .connection(PostDatabase.TABLE_POSTS)
            .select()
            .where({ id })

        return result as PostDB | undefined
    }

    public updatePost = async (postDB: PostDB): Promise<void> => {
        await BaseDatabase
            .connection(PostDatabase.TABLE_POSTS)
            .update(postDB)
            .where({ id: postDB.id })
    }

    public deletePostById = async (id: string): Promise<void> => {
        await BaseDatabase
            .connection(PostDatabase.TABLE_POSTS)
            .delete()
            .where({ id })
    }

    public findPostWithCreatorNameById = async (id: string): Promise<PostDBWithCreatorName | undefined> => {
        const [result] = await BaseDatabase
            .connection(PostDatabase.TABLE_POSTS)
            .select(
                `${PostDatabase.TABLE_POSTS}.id`,
                `${PostDatabase.TABLE_POSTS}.creator_id`,
                `${PostDatabase.TABLE_POSTS}.content`,
                `${PostDatabase.TABLE_POSTS}.likes`,
                `${PostDatabase.TABLE_POSTS}.dislikes`,
                `${PostDatabase.TABLE_POSTS}.created_at`,
                `${PostDatabase.TABLE_POSTS}.updated_at`,
                `${UserDatabase.TABLE_USERS}.name as creator_name`,
                `${PostDatabase.TABLE_POSTS}.comment_count`,
            )
            .join(
                `${UserDatabase.TABLE_USERS}`,
                `${PostDatabase.TABLE_POSTS}.creator_id`,
                "=",
                `${UserDatabase.TABLE_USERS}.id`
            )
            .where({ [`${PostDatabase.TABLE_POSTS}.id`]: id })

        return result as PostDBWithCreatorName | undefined
    }

    public findLikeDislike = async (likeDislikeDB: likeDislikeDB): Promise<POST_LIKE | undefined> => {
        const [result]: Array<likeDislikeDB | undefined> = await BaseDatabase.connection(PostDatabase.TABLE_LIKES_DISLIKES)
            .select()
            .where({
                user_id: likeDislikeDB.user_id,
                post_id: likeDislikeDB.post_id
            })

        if (result === undefined) {
            return undefined
        } else if (result.like === 1) {
            return POST_LIKE.ALREADY_LIKED
        } else {
            return POST_LIKE.ALREADY_DISLIKED
        }
    }

    public removeLikeDislike = async (likeDislikeDB: likeDislikeDB): Promise<void> => {
        await BaseDatabase
            .connection(PostDatabase.TABLE_LIKES_DISLIKES)
            .delete()
            .where({
                user_id: likeDislikeDB.user_id,
                post_id: likeDislikeDB.post_id
            })
    }

    public updateLikeDislike = async (likeDislikeDB: likeDislikeDB): Promise<void> => {
        await BaseDatabase
            .connection(PostDatabase.TABLE_LIKES_DISLIKES)
            .update(likeDislikeDB)
            .where({
                user_id: likeDislikeDB.user_id,
                post_id: likeDislikeDB.post_id
            })
    }

    public insertLikeDislike = async (likeDislikeDB: likeDislikeDB): Promise<void> => {
        await BaseDatabase
            .connection(PostDatabase.TABLE_LIKES_DISLIKES)
            .insert(likeDislikeDB)
    }

    public insertComment = async (commentDB: CommentDB): Promise<void> => {
        await BaseDatabase
            .connection(PostDatabase.TABLE_COMMENTS)
            .insert(commentDB);
    }
    

    public incrementCommentCount = async (postId: string): Promise<void> => {
        await BaseDatabase
            .connection(PostDatabase.TABLE_POSTS)
            .where({ id: postId })
            .increment('comment_count', 1); // Incrementa a contagem de comentários em 1
    }
    
    public getCommentsByPostId = async (postId: string): Promise<CommentDB[]> => {
        const commentsDB = await BaseDatabase
            .connection(PostDatabase.TABLE_COMMENTS)
            .select()
            .where({ post_id: postId });
    
        return commentsDB as CommentDB[];
    }

    public getUserNameByUserId = async (userId: string)=> {
        const [result] = await BaseDatabase
            .connection(UserDatabase.TABLE_USERS)
            .select("name")
            .where({ id: userId });
    
        return result ? result.name : undefined;
    }
}