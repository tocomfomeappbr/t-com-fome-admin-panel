export type OrderStatus = 'Pendente' | 'Confirmado' | 'Preparando' | 'Saiu para entrega' | 'Entregue' | 'Cancelado';
export type PaymentMethod = 'PIX' | 'Cartão de Crédito' | 'Cartão de Débito' | 'Dinheiro';

export interface Order {
  id: number;
  customer: string;
  restaurant: string;
  items: string;
  total: number;
  payment: PaymentMethod;
  status: OrderStatus;
  date: string;
  address: string;
}

export interface Restaurant {
  id: number;
  name: string;
  category: string;
  rating: number;
  logo: string;
  isOpen: boolean;
  isActive: boolean;
  deliveryFee: number;
  estimatedTime: string;
  address: string;
  phone: string;
  description: string;
}

export interface Product {
  id: number;
  restaurantId: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  isPopular: boolean;
  isAvailable: boolean;
}

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  createdAt: string;
  orderCount: number;
  totalSpent: number;
}

export interface Delivery {
  id: number;
  orderId: number;
  restaurant: string;
  customerAddress: string;
  status: 'Coletando' | 'Saiu para entrega' | 'Entregue';
  estimatedTime: string;
  driver: string;
}

export const mockRestaurants: Restaurant[] = [
  { id: 1, name: 'Pizzaria do Alemão', category: 'Pizzaria', rating: 4.7, logo: '🍕', isOpen: true, isActive: true, deliveryFee: 5.99, estimatedTime: '35-50 min', address: 'Rua Balduíno Taques, 1200 - Centro', phone: '(42) 99901-1234', description: 'As melhores pizzas de Ponta Grossa desde 2005.' },
  { id: 2, name: 'Burger House PG', category: 'Hamburgueria', rating: 4.5, logo: '🍔', isOpen: true, isActive: true, deliveryFee: 4.99, estimatedTime: '25-40 min', address: 'Av. Carlos Cavalcanti, 3500 - Uvaranas', phone: '(42) 99902-5678', description: 'Hambúrgueres artesanais com ingredientes selecionados.' },
  { id: 3, name: 'Sushi Hashi', category: 'Japonesa', rating: 4.8, logo: '🍣', isOpen: false, isActive: true, deliveryFee: 7.99, estimatedTime: '40-55 min', address: 'Rua XV de Novembro, 800 - Centro', phone: '(42) 99903-9012', description: 'Culinária japonesa autêntica com peixes frescos.' },
  { id: 4, name: 'Açaí Tropical', category: 'Açaí / Sorvetes', rating: 4.3, logo: '🍇', isOpen: true, isActive: true, deliveryFee: 3.99, estimatedTime: '15-25 min', address: 'Rua Engenheiro Schamber, 450 - Estrela', phone: '(42) 99904-3456', description: 'Açaí puro do Pará com diversas opções de acompanhamentos.' },
  { id: 5, name: 'Churrascaria Gaúcha', category: 'Churrascaria', rating: 4.6, logo: '🥩', isOpen: true, isActive: true, deliveryFee: 6.99, estimatedTime: '30-45 min', address: 'Av. Visconde de Mauá, 2100 - Oficinas', phone: '(42) 99905-7890', description: 'Carnes nobres na brasa, tradição gaúcha.' },
  { id: 6, name: 'Pastelaria Central', category: 'Pastelaria', rating: 4.2, logo: '🥟', isOpen: false, isActive: false, deliveryFee: 2.99, estimatedTime: '15-20 min', address: 'Rua Dr. Colares, 150 - Centro', phone: '(42) 99906-1234', description: 'Pastéis gigantes com recheios variados.' },
  { id: 7, name: 'Marmitex da Vovó', category: 'Marmitex', rating: 4.4, logo: '🍱', isOpen: true, isActive: true, deliveryFee: 3.49, estimatedTime: '20-35 min', address: 'Rua Bonifácio Vilela, 700 - Nova Rússia', phone: '(42) 99907-5678', description: 'Comida caseira como a da vovó, todo dia um cardápio diferente.' },
  { id: 8, name: 'Doceria Bella', category: 'Doceria', rating: 4.9, logo: '🧁', isOpen: true, isActive: true, deliveryFee: 4.49, estimatedTime: '20-30 min', address: 'Rua Júlia Wanderley, 300 - Jardim Carvalho', phone: '(42) 99908-9012', description: 'Doces artesanais feitos com muito amor.' },
];

export const mockOrders: Order[] = [
  { id: 1001, customer: 'João Silva', restaurant: 'Pizzaria do Alemão', items: '1x Pizza Calabresa G, 1x Guaraná 2L', total: 62.90, payment: 'PIX', status: 'Entregue', date: '2025-04-15 19:30', address: 'Rua Tibagi, 450 - Uvaranas' },
  { id: 1002, customer: 'Maria Santos', restaurant: 'Burger House PG', items: '2x Smash Burger, 1x Batata Frita', total: 54.70, payment: 'Cartão de Crédito', status: 'Saiu para entrega', date: '2025-04-15 20:15', address: 'Av. Gen. Carlos Cavalcanti, 1200 - Uvaranas' },
  { id: 1003, customer: 'Carlos Oliveira', restaurant: 'Sushi Hashi', items: '1x Combo 30 peças', total: 89.90, payment: 'Cartão de Débito', status: 'Preparando', date: '2025-04-15 20:30', address: 'Rua Engenheiro Schamber, 890 - Estrela' },
  { id: 1004, customer: 'Ana Costa', restaurant: 'Açaí Tropical', items: '1x Açaí 500ml + Morango, Banana', total: 22.50, payment: 'PIX', status: 'Confirmado', date: '2025-04-15 20:45', address: 'Rua Dr. Colares, 200 - Centro' },
  { id: 1005, customer: 'Pedro Mendes', restaurant: 'Pizzaria do Alemão', items: '1x Pizza 4 Queijos M, 1x Coca 600ml', total: 48.90, payment: 'Dinheiro', status: 'Pendente', date: '2025-04-15 21:00', address: 'Rua Balduíno Taques, 500 - Centro' },
  { id: 1006, customer: 'Fernanda Lima', restaurant: 'Churrascaria Gaúcha', items: '1x Picanha 400g, 1x Arroz, 1x Farofa', total: 72.00, payment: 'Cartão de Crédito', status: 'Entregue', date: '2025-04-15 18:00', address: 'Av. Visconde de Mauá, 800 - Oficinas' },
  { id: 1007, customer: 'Lucas Almeida', restaurant: 'Marmitex da Vovó', items: '2x Marmitex GG Completo', total: 39.80, payment: 'PIX', status: 'Entregue', date: '2025-04-15 12:30', address: 'Rua Bonifácio Vilela, 100 - Nova Rússia' },
  { id: 1008, customer: 'Juliana Prado', restaurant: 'Burger House PG', items: '1x X-Bacon, 1x Milkshake', total: 42.90, payment: 'Cartão de Débito', status: 'Cancelado', date: '2025-04-15 19:00', address: 'Rua XV de Novembro, 350 - Centro' },
  { id: 1009, customer: 'Roberto Nunes', restaurant: 'Doceria Bella', items: '1x Bolo de Chocolate P, 6x Brigadeiro', total: 58.00, payment: 'PIX', status: 'Entregue', date: '2025-04-15 15:00', address: 'Rua Júlia Wanderley, 600 - Jardim Carvalho' },
  { id: 1010, customer: 'Camila Ferreira', restaurant: 'Pastelaria Central', items: '3x Pastel Carne, 1x Caldo de Cana', total: 27.50, payment: 'Dinheiro', status: 'Entregue', date: '2025-04-15 13:00', address: 'Rua Dr. Colares, 50 - Centro' },
  { id: 1011, customer: 'Thiago Barbosa', restaurant: 'Pizzaria do Alemão', items: '1x Pizza Frango c/ Catupiry GG', total: 72.90, payment: 'Cartão de Crédito', status: 'Preparando', date: '2025-04-15 21:10', address: 'Rua Tibagi, 1100 - Boa Vista' },
  { id: 1012, customer: 'Isabela Moraes', restaurant: 'Açaí Tropical', items: '1x Açaí 700ml Premium', total: 32.90, payment: 'PIX', status: 'Saiu para entrega', date: '2025-04-15 21:05', address: 'Av. Carlos Cavalcanti, 2800 - Uvaranas' },
];

export const mockProducts: Product[] = [
  { id: 1, restaurantId: 1, name: 'Pizza Calabresa G', description: 'Calabresa, cebola, azeitona e mussarela', price: 42.90, category: 'Pizzas', image: '🍕', isPopular: true, isAvailable: true },
  { id: 2, restaurantId: 1, name: 'Pizza 4 Queijos M', description: 'Mussarela, provolone, parmesão e gorgonzola', price: 38.90, category: 'Pizzas', image: '🍕', isPopular: true, isAvailable: true },
  { id: 3, restaurantId: 1, name: 'Pizza Portuguesa G', description: 'Presunto, ovo, cebola, azeitona e mussarela', price: 44.90, category: 'Pizzas', image: '🍕', isPopular: false, isAvailable: true },
  { id: 4, restaurantId: 1, name: 'Guaraná 2L', description: 'Guaraná Antarctica 2 litros', price: 12.00, category: 'Bebidas', image: '🥤', isPopular: false, isAvailable: true },
  { id: 5, restaurantId: 2, name: 'Smash Burger', description: 'Blend 120g, queijo cheddar, cebola caramelizada', price: 22.90, category: 'Hambúrgueres', image: '🍔', isPopular: true, isAvailable: true },
  { id: 6, restaurantId: 2, name: 'X-Bacon', description: 'Blend 150g, bacon, queijo, alface e tomate', price: 28.90, category: 'Hambúrgueres', image: '🍔', isPopular: true, isAvailable: true },
  { id: 7, restaurantId: 2, name: 'Batata Frita', description: 'Porção de batata frita crocante', price: 14.90, category: 'Acompanhamentos', image: '🍟', isPopular: false, isAvailable: true },
  { id: 8, restaurantId: 2, name: 'Milkshake Ovomaltine', description: 'Milkshake cremoso de Ovomaltine 400ml', price: 18.90, category: 'Bebidas', image: '🥤', isPopular: false, isAvailable: false },
  { id: 9, restaurantId: 3, name: 'Combo 30 peças', description: 'Mix de sushi, sashimi e hot roll', price: 89.90, category: 'Combos', image: '🍣', isPopular: true, isAvailable: true },
  { id: 10, restaurantId: 3, name: 'Temaki Salmão', description: 'Temaki de salmão com cream cheese', price: 28.90, category: 'Temakis', image: '🍣', isPopular: true, isAvailable: true },
  { id: 11, restaurantId: 4, name: 'Açaí 500ml', description: 'Açaí batido com banana + 3 acompanhamentos', price: 22.50, category: 'Açaí', image: '🍇', isPopular: true, isAvailable: true },
  { id: 12, restaurantId: 4, name: 'Açaí 700ml Premium', description: 'Açaí premium com leite ninho e Nutella', price: 32.90, category: 'Açaí', image: '🍇', isPopular: true, isAvailable: true },
  { id: 13, restaurantId: 5, name: 'Picanha 400g', description: 'Picanha na brasa com farofa e vinagrete', price: 59.90, category: 'Carnes', image: '🥩', isPopular: true, isAvailable: true },
  { id: 14, restaurantId: 7, name: 'Marmitex GG Completo', description: 'Arroz, feijão, carne, salada e farofa', price: 19.90, category: 'Marmitex', image: '🍱', isPopular: true, isAvailable: true },
  { id: 15, restaurantId: 8, name: 'Bolo de Chocolate P', description: 'Bolo de chocolate com cobertura cremosa', price: 35.00, category: 'Bolos', image: '🎂', isPopular: true, isAvailable: true },
  { id: 16, restaurantId: 8, name: 'Brigadeiro Gourmet (6un)', description: 'Brigadeiros gourmet sortidos', price: 23.00, category: 'Doces', image: '🧁', isPopular: true, isAvailable: true },
];

export const mockUsers: User[] = [
  { id: 1, name: 'João Silva', email: 'joao.silva@email.com', phone: '(42) 99901-0001', createdAt: '2024-08-15', orderCount: 23, totalSpent: 1245.70 },
  { id: 2, name: 'Maria Santos', email: 'maria.santos@email.com', phone: '(42) 99902-0002', createdAt: '2024-09-20', orderCount: 15, totalSpent: 876.30 },
  { id: 3, name: 'Carlos Oliveira', email: 'carlos.oliveira@email.com', phone: '(42) 99903-0003', createdAt: '2024-10-01', orderCount: 8, totalSpent: 534.60 },
  { id: 4, name: 'Ana Costa', email: 'ana.costa@email.com', phone: '(42) 99904-0004', createdAt: '2024-11-10', orderCount: 3, totalSpent: 89.70 },
  { id: 5, name: 'Pedro Mendes', email: 'pedro.mendes@email.com', phone: '(42) 99905-0005', createdAt: '2024-12-05', orderCount: 42, totalSpent: 2340.80 },
  { id: 6, name: 'Fernanda Lima', email: 'fernanda.lima@email.com', phone: '(42) 99906-0006', createdAt: '2025-01-15', orderCount: 6, totalSpent: 412.00 },
  { id: 7, name: 'Lucas Almeida', email: 'lucas.almeida@email.com', phone: '(42) 99907-0007', createdAt: '2025-01-28', orderCount: 12, totalSpent: 598.40 },
  { id: 8, name: 'Juliana Prado', email: 'juliana.prado@email.com', phone: '(42) 99908-0008', createdAt: '2025-02-10', orderCount: 1, totalSpent: 42.90 },
  { id: 9, name: 'Roberto Nunes', email: 'roberto.nunes@email.com', phone: '(42) 99909-0009', createdAt: '2025-02-20', orderCount: 7, totalSpent: 385.50 },
  { id: 10, name: 'Camila Ferreira', email: 'camila.ferreira@email.com', phone: '(42) 99910-0010', createdAt: '2025-03-01', orderCount: 19, totalSpent: 1102.60 },
  { id: 11, name: 'Thiago Barbosa', email: 'thiago.barbosa@email.com', phone: '(42) 99911-0011', createdAt: '2025-03-15', orderCount: 2, totalSpent: 115.80 },
  { id: 12, name: 'Isabela Moraes', email: 'isabela.moraes@email.com', phone: '(42) 99912-0012', createdAt: '2025-04-01', orderCount: 4, totalSpent: 178.30 },
];

export const mockDeliveries: Delivery[] = [
  { id: 1, orderId: 1002, restaurant: 'Burger House PG', customerAddress: 'Av. Gen. Carlos Cavalcanti, 1200 - Uvaranas', status: 'Saiu para entrega', estimatedTime: '12 min', driver: 'Ricardo Souza' },
  { id: 2, orderId: 1012, restaurant: 'Açaí Tropical', customerAddress: 'Av. Carlos Cavalcanti, 2800 - Uvaranas', status: 'Saiu para entrega', estimatedTime: '8 min', driver: 'Felipe Santos' },
  { id: 3, orderId: 1003, restaurant: 'Sushi Hashi', customerAddress: 'Rua Engenheiro Schamber, 890 - Estrela', status: 'Coletando', estimatedTime: '25 min', driver: 'Marcos Lima' },
  { id: 4, orderId: 1011, restaurant: 'Pizzaria do Alemão', customerAddress: 'Rua Tibagi, 1100 - Boa Vista', status: 'Coletando', estimatedTime: '20 min', driver: 'André Costa' },
];

export const ordersByHour = [
  { hour: '11h', pedidos: 5 }, { hour: '12h', pedidos: 18 }, { hour: '13h', pedidos: 12 },
  { hour: '14h', pedidos: 4 }, { hour: '15h', pedidos: 3 }, { hour: '16h', pedidos: 2 },
  { hour: '17h', pedidos: 6 }, { hour: '18h', pedidos: 15 }, { hour: '19h', pedidos: 28 },
  { hour: '20h', pedidos: 35 }, { hour: '21h', pedidos: 22 }, { hour: '22h', pedidos: 10 },
];

export const revenueByDay = [
  { day: 'Seg', faturamento: 1850 }, { day: 'Ter', faturamento: 2100 },
  { day: 'Qua', faturamento: 1950 }, { day: 'Qui', faturamento: 2400 },
  { day: 'Sex', faturamento: 3200 }, { day: 'Sáb', faturamento: 3800 },
  { day: 'Dom', faturamento: 2900 },
];

export const revenueByRestaurant = [
  { restaurant: 'Pizzaria do Alemão', revenue: 4850.70, orders: 68 },
  { restaurant: 'Burger House PG', revenue: 3920.40, orders: 85 },
  { restaurant: 'Sushi Hashi', revenue: 3100.00, orders: 32 },
  { restaurant: 'Açaí Tropical', revenue: 2450.30, orders: 95 },
  { restaurant: 'Churrascaria Gaúcha', revenue: 2800.00, orders: 38 },
  { restaurant: 'Marmitex da Vovó', revenue: 1980.60, orders: 72 },
  { restaurant: 'Doceria Bella', revenue: 1650.00, orders: 45 },
  { restaurant: 'Pastelaria Central', revenue: 890.50, orders: 55 },
];

export const dashboardStats = {
  ordersToday: 42,
  revenueToday: 3847.50,
  averageTicket: 91.61,
  activeOrders: 4,
};

export const statusColors: Record<string, string> = {
  'Pendente': 'bg-warning/20 text-warning-foreground border border-warning/30',
  'Confirmado': 'bg-info/20 text-info border border-info/30',
  'Preparando': 'bg-chart-4/20 text-chart-4 border border-chart-4/30',
  'Saiu para entrega': 'bg-primary/20 text-primary border border-primary/30',
  'Entregue': 'bg-success/20 text-success border border-success/30',
  'Cancelado': 'bg-destructive/20 text-destructive border border-destructive/30',
  'Coletando': 'bg-chart-4/20 text-chart-4 border border-chart-4/30',
};

export function formatCurrency(value: number): string {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}
