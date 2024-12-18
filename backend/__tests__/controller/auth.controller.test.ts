import supertest from "supertest";
import app from "../../src/app";

describe('authenticate test',()=>{

    test('signup test',async ()=>{
        let res = supertest(app).post('/auth/signup')
        .send({
            name:"vaibhav",
            email:"vk@gmail.com",
            password:"Vks@1234"
        })
        expect((await res).status).toBe(201)
        expect((await res).body).toHaveProperty('token')
        expect((await res).body.data).toHaveProperty('id')
    })

    test('signin test',async ()=>{
        let res = supertest(app).post('/auth/signup')
        .send({
            email:"vk@gmail.com",
            password:"Vks@1234"
        })
        expect((await res).status).toBe(200)
        expect((await res).body).toHaveProperty('token')
        expect((await res).body.data).toHaveProperty('id')
    })



})

/*
test('authentication successful', async () => {
    (authenticateUser as jest.Mock).mockResolvedValue({
        status: 200,
        message: 'User authenticated successfully',
        user: {
            id: 2,
            email: 'debasish@webkorps.com',
            role: 'user'
        }
    });
    (prisma.reaction.findMany as jest.Mock).mockResolvedValue([
        { postId: 1, type: 'like' },
        { postId: 2, type: 'dislike' },
    ]
    );
    const result = await getMyReactionsService('valid token') as
        { status: number; message: string; posts: { postId: number; reaction: string }[] };
    expect(result.status).toBe(200);
    expect(result.message).toBe('posts with reactions retrieved successfully');
    expect(result.posts).toHaveLength(2);
    expect(result.posts[0].postId).toBe(1);
    expect(result.posts[0].reaction).toBe('like');
});
test('authentication fails', async () => {
    (authenticateUser as jest.Mock).mockResolvedValue({
        status: 400,
        message: 'Invalid Credentials',
        user: null
    });
    const result = await getMyReactionsService('invalid token');
    expect(result.status).toBe(400);
    expect(result.message).toBe('Invalid Credentials');
});

*/