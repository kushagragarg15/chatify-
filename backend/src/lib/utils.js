import jwt from 'jsonwebtoken';

export const generateToken = (userId,res)=>{
    const token = jwt.sign({userId},process.env.JWT_SECRET,{
        expiresIn:'7d'
    })

    // Frontend (Vercel) and backend (Render) live on different origins in
    // production, so the auth cookie must be cross-site: sameSite "none"
    // requires secure "true" (browsers reject "none" over plain HTTP).
    const isProd = process.env.NODE_ENV === "production";
    res.cookie('token',token,{
        maxAge:7*24*60*60*1000,
        httpOnly:true,
        sameSite: isProd ? "none" : "lax",
        secure: isProd
    })
    return token;
}