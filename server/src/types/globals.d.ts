declare global {
  type Entity = {
    id: string;
    created_at: string;
    updated_at: string;
  };

  type MongooseEntity = {
    _id: string;
    created_at: string;
    updated_at: string;
  };
}

export {};
