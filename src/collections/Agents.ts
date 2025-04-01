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
      name: 'RdvCumule',
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
      async ({ data, req, originalDoc }) => {
        if (originalDoc) {
          const oldNombreRdv = originalDoc.nombreRdv || 0;
          const newNombreRdv = data.nombreRdv || 0;
          const difference = newNombreRdv - oldNombreRdv;

          return {
            ...data,
            RdvCumule: (originalDoc.RdvCumule || 0) + difference,
          };
        }
        return data;
      },
    ],
  },
};




export default Agents;
