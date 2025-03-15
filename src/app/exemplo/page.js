'use client';
import React from 'react';
import Pagination from '@/components/Pagination';
import { usePagination } from '@/hooks/usePagination';

export default function ExemploPage() {
    // Simulação de dados
    const items = Array.from({ length: 100 }, (_, i) => ({
        id: i + 1,
        title: `Item ${i + 1}`,
        description: `Descrição do item ${i + 1}`,
    }));

    const { currentPage, totalPages, paginatedItems, handlePageChange } = usePagination(items, 10);

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Exemplo de Paginação</h1>

            <div className="grid gap-4">
                {paginatedItems.map((item) => (
                    <div key={item.id} className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow">
                        <h2 className="text-xl font-semibold">{item.title}</h2>
                        <p className="text-gray-600">{item.description}</p>
                    </div>
                ))}
            </div>

            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </div>
    );
}
