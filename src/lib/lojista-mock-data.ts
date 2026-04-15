export interface LojistaOrder {
  id: number;
  customer: string;
  items: { name: string; qty: number; price: number }[];
  total: number;
  payment: string;
  status: 'Novo' | 'Confirmado' | 'Preparando' | 'Pronto' | 'Saiu';
  address: string;
  createdAt: string;
  timeElapsed: string;
}

export interface LojistaReview {
  id: number;
  customer: string;
  rating: number;
  comment: string;
  date: string;
  orderId: number;
}

export interface LojistaFinanceEntry {
  id: number;
  date: string;
  orderId: number;
  grossAmount: number;
  serviceFee: number;
  netAmount: number;
}

export interface BusinessHours {
  day: string;
  open: string;
  close: string;
  enabled: boolean;
}

export const lojistaOrders: LojistaOrder[] = [
  { id: 2001, customer: 'João Silva', items: [{ name: 'Smash Burger', qty: 2, price: 22.90 }, { name: 'Batata Frita', qty: 1, price: 14.90 }], total: 60.70, payment: 'PIX', status: 'Novo', address: 'Rua Tibagi, 450 - Uvaranas', createdAt: '2025-04-15 21:15', timeElapsed: '2 min' },
  { id: 2002, customer: 'Maria Santos', items: [{ name: 'X-Bacon', qty: 1, price: 28.90 }, { name: 'Milkshake Ovomaltine', qty: 1, price: 18.90 }], total: 47.80, payment: 'Cartão', status: 'Confirmado', address: 'Av. Gen. Carlos Cavalcanti, 1200 - Uvaranas', createdAt: '2025-04-15 21:05', timeElapsed: '12 min' },
  { id: 2003, customer: 'Carlos Oliveira', items: [{ name: 'Smash Burger', qty: 1, price: 22.90 }], total: 22.90, payment: 'PIX', status: 'Preparando', address: 'Rua Engenheiro Schamber, 890 - Estrela', createdAt: '2025-04-15 20:50', timeElapsed: '27 min' },
  { id: 2004, customer: 'Ana Costa', items: [{ name: 'X-Bacon', qty: 2, price: 28.90 }, { name: 'Batata Frita', qty: 2, price: 14.90 }], total: 87.60, payment: 'Cartão', status: 'Pronto', address: 'Rua Dr. Colares, 200 - Centro', createdAt: '2025-04-15 20:30', timeElapsed: '47 min' },
  { id: 2005, customer: 'Pedro Mendes', items: [{ name: 'Smash Burger', qty: 3, price: 22.90 }, { name: 'Batata Frita', qty: 1, price: 14.90 }], total: 83.60, payment: 'Dinheiro', status: 'Saiu', address: 'Rua Balduíno Taques, 500 - Centro', createdAt: '2025-04-15 20:10', timeElapsed: '67 min' },
  { id: 2006, customer: 'Fernanda Lima', items: [{ name: 'X-Bacon', qty: 1, price: 28.90 }], total: 28.90, payment: 'PIX', status: 'Novo', address: 'Av. Visconde de Mauá, 800 - Oficinas', createdAt: '2025-04-15 21:18', timeElapsed: '1 min' },
];

export const lojistaReviews: LojistaReview[] = [
  { id: 1, customer: 'João Silva', rating: 5, comment: 'Melhor hambúrguer de PG! Sempre peço aqui.', date: '2025-04-15', orderId: 1045 },
  { id: 2, customer: 'Maria Santos', rating: 4, comment: 'Muito bom, mas demorou um pouco mais que o esperado.', date: '2025-04-14', orderId: 1038 },
  { id: 3, customer: 'Carlos Oliveira', rating: 5, comment: 'Perfeito! Smash burger incrível.', date: '2025-04-14', orderId: 1035 },
  { id: 4, customer: 'Ana Costa', rating: 3, comment: 'Sabor bom, mas a batata chegou murcha.', date: '2025-04-13', orderId: 1030 },
  { id: 5, customer: 'Pedro Mendes', rating: 5, comment: 'Sensacional como sempre!', date: '2025-04-13', orderId: 1028 },
  { id: 6, customer: 'Fernanda Lima', rating: 4, comment: 'Gostei muito do X-Bacon, vou pedir de novo.', date: '2025-04-12', orderId: 1025 },
  { id: 7, customer: 'Lucas Almeida', rating: 2, comment: 'Pedido veio errado, faltou o milkshake.', date: '2025-04-12', orderId: 1022 },
  { id: 8, customer: 'Juliana Prado', rating: 5, comment: 'Rápido e delicioso!', date: '2025-04-11', orderId: 1018 },
  { id: 9, customer: 'Roberto Nunes', rating: 4, comment: 'Boa qualidade, preço justo.', date: '2025-04-10', orderId: 1015 },
  { id: 10, customer: 'Camila Ferreira', rating: 5, comment: 'O melhor da região, sem dúvidas!', date: '2025-04-09', orderId: 1010 },
];

export const lojistaFinance: LojistaFinanceEntry[] = [
  { id: 1, date: '2025-04-15', orderId: 2001, grossAmount: 60.70, serviceFee: 6.07, netAmount: 54.63 },
  { id: 2, date: '2025-04-15', orderId: 2002, grossAmount: 47.80, serviceFee: 4.78, netAmount: 43.02 },
  { id: 3, date: '2025-04-15', orderId: 2003, grossAmount: 22.90, serviceFee: 2.29, netAmount: 20.61 },
  { id: 4, date: '2025-04-15', orderId: 2004, grossAmount: 87.60, serviceFee: 8.76, netAmount: 78.84 },
  { id: 5, date: '2025-04-15', orderId: 2005, grossAmount: 83.60, serviceFee: 8.36, netAmount: 75.24 },
  { id: 6, date: '2025-04-14', orderId: 1945, grossAmount: 54.70, serviceFee: 5.47, netAmount: 49.23 },
  { id: 7, date: '2025-04-14', orderId: 1938, grossAmount: 42.90, serviceFee: 4.29, netAmount: 38.61 },
  { id: 8, date: '2025-04-14', orderId: 1930, grossAmount: 68.50, serviceFee: 6.85, netAmount: 61.65 },
  { id: 9, date: '2025-04-13', orderId: 1920, grossAmount: 95.40, serviceFee: 9.54, netAmount: 85.86 },
  { id: 10, date: '2025-04-13', orderId: 1915, grossAmount: 33.80, serviceFee: 3.38, netAmount: 30.42 },
];

export const lojistaOrdersByHour = [
  { hour: '11h', pedidos: 2 }, { hour: '12h', pedidos: 8 }, { hour: '13h', pedidos: 5 },
  { hour: '14h', pedidos: 2 }, { hour: '15h', pedidos: 1 }, { hour: '16h', pedidos: 1 },
  { hour: '17h', pedidos: 3 }, { hour: '18h', pedidos: 7 }, { hour: '19h', pedidos: 14 },
  { hour: '20h', pedidos: 18 }, { hour: '21h', pedidos: 12 }, { hour: '22h', pedidos: 5 },
];

export const lojistaBusinessHours: BusinessHours[] = [
  { day: 'Segunda', open: '11:00', close: '23:00', enabled: true },
  { day: 'Terça', open: '11:00', close: '23:00', enabled: true },
  { day: 'Quarta', open: '11:00', close: '23:00', enabled: true },
  { day: 'Quinta', open: '11:00', close: '23:00', enabled: true },
  { day: 'Sexta', open: '11:00', close: '00:00', enabled: true },
  { day: 'Sábado', open: '11:00', close: '00:00', enabled: true },
  { day: 'Domingo', open: '16:00', close: '23:00', enabled: true },
];

export const lojistaStats = {
  ordersToday: 18,
  revenueToday: 1245.60,
  avgRating: 4.5,
  avgPrepTime: '22 min',
  receiveToday: 1120.90,
  receiveWeek: 5840.30,
  receiveMonth: 22450.80,
};

export const lojistaKanbanStatuses = ['Novo', 'Confirmado', 'Preparando', 'Pronto', 'Saiu'] as const;

import { formatCurrency } from './mock-data';
export { formatCurrency };
