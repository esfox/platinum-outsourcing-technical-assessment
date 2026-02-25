import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import type { IntegrationService } from '@/services/integrations';

type IntegrationsServicesSectionProps = {
  services: IntegrationService[];
};

export function IntegrationsServicesSection({ services }: IntegrationsServicesSectionProps) {
  return (
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {services.map((service) => (
        <Card key={service.id} className="flex h-full flex-col">
          <CardHeader className="flex-row items-center gap-2 p-2">
            <div className="flex size-13 items-center justify-center p-1">
              <img src={service.logo} alt={`${service.name} logo`} className="h-full w-full object-contain" />
            </div>
            <CardTitle className="text-lg font-semibold">{service.name}</CardTitle>
          </CardHeader>
          <CardContent className="text-sm">{service.description}</CardContent>
          <CardFooter className="mt-auto">
            <Button size="sm" className="text-sm h-7 rounded">
              Add Connection
            </Button>
          </CardFooter>
        </Card>
      ))}
    </section>
  );
}
