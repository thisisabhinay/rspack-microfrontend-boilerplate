declare module "remotevue/*" {
  const component: any
  export default component
  export * from "remotevue/*"
}

declare module "remotereact/*" {
  const component: any
  export default component
  export * from "remotereact/*"
}
