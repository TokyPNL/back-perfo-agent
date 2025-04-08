import { CollectionConfig } from 'payload'

const Agents: CollectionConfig = {
  slug: 'agents',
  auth: false,
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
      name: 'type',
      type: 'select',
      options: [
        { label: 'Agent', value: 'agent' },
        { label: 'Manager', value: 'manager' },
      ],
      required: true,
    },
    {
      name: 'projets',
      type: 'relationship',
      relationTo: 'projets',
       hasMany: true,
    },
    {
      name: 'nombreRdv',
      type: 'number',
      required: true,
    },
    {
      name: 'RdvCumuleWeek',
      type: 'number',
      required: true,
      defaultValue: 0, 
      admin: {
        readOnly: true,
      },
    },
  ],

  hooks: {
    beforeChange: [
      async ({ data, operation }) => {
        if (operation === 'update' && data.nombreRdv > 0) {
          data.RdvCumuleWeek += data.nombreRdv;
        }
        return data;
      },
    ],
  },
};




export default Agents;
