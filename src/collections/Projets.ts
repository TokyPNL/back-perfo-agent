import { CollectionConfig } from 'payload'

const Projets: CollectionConfig = {
    slug: 'projets',
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
        name: 'manager',
        type: 'relationship',
        relationTo: 'agents',
        required: true, // Un projet est géré par un seul manager
        
      },
      
    ],
  };
  
  export default Projets;

