import { UIButton } from '@/ui/components/Button';
import UIForm from '@/ui/components/Form';
import UIFormInput from '@/ui/components/Input/Form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FunctionComponent } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

interface AssetNameFilterProps {
  handleFilterByName: (search: string) => void;
  clearFilters: () => void;
}

const schema = z.object({
  name: z
    .string()
    .min(2, 'Preencha pelo menos dois caracteres para pesquisar.'),
});

type FormFields = z.infer<typeof schema>;

const defaultValues: FormFields = {
  name: '',
};

const AssetNameFilter: FunctionComponent<AssetNameFilterProps> = ({
  handleFilterByName,
  clearFilters,
}) => {
  const { control, handleSubmit, reset } = useForm<FormFields>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const submit = (data: FormFields) => {
    handleFilterByName(data.name);
  };

  return (
    <UIForm onSubmit={handleSubmit(submit)}>
      <div className="flex gap-2 items-center">
        <UIFormInput
          control={control}
          name="name"
          type="text"
          placeholder="Pesquise por nome"
        />
        <UIButton
          variant="ghost"
          size="icon"
          icon={{ position: 'center', src: '/search.svg', size: 18 }}
          className="mr-2"
          type="submit"
        />
      </div>
      <div className="flex justify-end pr-2">
        <UIButton
          size="sm"
          variant="ghost"
          onClick={() => {
            clearFilters();
            reset(defaultValues);
          }}
        >
          Limpar filtros
        </UIButton>
      </div>
    </UIForm>
  );
};

export default AssetNameFilter;
