const metrics = [
    { value: '10k+', label: 'Posts Gerados' },
    { value: '95%', label: 'Satisfação dos Usuários' },
    { value: '50+', label: 'Modelos de Conteúdo' },
    { value: '24/7', label: 'Disponibilidade' },
];

export default function Metrics() {
    return (
        <div className="theme-surface rounded-xl p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {metrics.map((metric, index) => (
                    <div key={index} className="text-center">
                        <div className="text-4xl font-bold text-primary mb-2">{metric.value}</div>
                        <div className="theme-text-secondary">{metric.label}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}
