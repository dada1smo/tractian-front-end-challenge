import { UIButton } from '@/ui/components/Button';
import UIForm from '@/ui/components/Form';
import UIFormInput from '@/ui/components/Input/Form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FunctionComponent } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { z, ZodType } from 'zod';

interface AssetNameFilterProps {
  handleFilterByName?: (search: string) => void;
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
}) => {
  const { control, handleSubmit } = useForm<FormFields>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const submit = (data: FormFields) => {
    console.log(data);
  };

  return (
    <UIForm onSubmit={handleSubmit(submit)}>
      <div className="flex gap-2 items-center">
        <UIFormInput control={control} name="name" type="text" />
        <UIButton
          variant="ghost"
          size="icon"
          icon={{ position: 'center', src: '/search.svg', size: 18 }}
          className="mr-2"
          type="submit"
        />
      </div>
    </UIForm>
  );
};

export default AssetNameFilter;
