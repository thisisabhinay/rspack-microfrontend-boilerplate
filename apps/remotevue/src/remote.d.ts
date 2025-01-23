declare module "remotereact/*" {
  const component: any
  export default component
  export * from "remotereact/*"
}

declare module "@repo/global-store/*" {
  const component: any
  export default component
  export * from "@repo/global-store/*"
}
