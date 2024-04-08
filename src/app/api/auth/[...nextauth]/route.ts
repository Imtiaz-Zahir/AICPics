// import NextAuth from "next-auth"
// import authOptions from "./authOptions"

// const handler = NextAuth(authOptions)

// export { handler as GET, handler as POST }

export function GET(){
    return new Response("Error while downloading image", { status: 500 });
}