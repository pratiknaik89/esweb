/* SystemJS module definition */
declare var module: NodeModule;
interface NodeModule {
  id: string;
}
declare var util: any;
declare var $: any;
declare module "*.json" {
  const value: any;
  export default value;
}

declare var common: any;
