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
      name: 'RdvSemaine',
      type: 'number',
      required: true,
      defaultValue: 0, 
      admin: {
        readOnly: false,
      },
    },
  ],

  hooks: {
    beforeChange: [
      // async ({ data, operation }) => {
      //   if (operation === 'update' && data.nombreRdv > 0) {
      //     data.RdvSemaine += data.nombreRdv;
      //   }
      //   return data;
      // },

      async ({ data, originalDoc, operation }) => {
        if (operation === 'update') {
          const ancienNombreRdv = originalDoc?.nombreRdv || 0;
          const nouveauNombreRdv = data.nombreRdv;
  
          // Si nombreRdv est fourni ET a changé
          if (
            typeof nouveauNombreRdv === 'number' &&
            nouveauNombreRdv > 0 &&
            nouveauNombreRdv !== ancienNombreRdv
          ) {
            const ancienRdvSemaine = originalDoc?.RdvSemaine || 0;
            data.RdvSemaine = ancienRdvSemaine + nouveauNombreRdv;
          }
        }
  
        return data;
      },
    ],
  },
};




export default Agents;
