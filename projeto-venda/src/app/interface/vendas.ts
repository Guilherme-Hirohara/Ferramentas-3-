import { ItensVenda } from "./itens.venda";

export interface Vendas {
    id: number, 
    cliente: string, 
    data: string, 
    itens: ItensVenda[]
}
