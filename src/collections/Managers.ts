import { CollectionConfig } from 'payload';

const Managers: CollectionConfig = {
  slug: 'managers',
  admin: {
    useAsTitle: 'nom',
  },
  fields: [
    {
      name: 'nom',
      type: 'text',
      required: true,
      },
      {
        name: 'prenom',
        type: 'text',
        required: true,
      },
    {
      name: 'matricule',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'nombreRdv',
      type: 'number',
      hasMany: true,
    }, 
  ],
};

export default Managers;
