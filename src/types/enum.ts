enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

enum PetType {
  CAT = 'CAT',
  DOG = 'DOG',
}

enum PetSize {
  SMALL = 'SMALL',
  MEDIUM = 'MEDIUM',
  LARGE = 'LARGE',
}

enum Status {
  IDLE = 'IDLE',
  PENDING = 'PENDING',
  RESOLVED = 'RESOLVED',
  REJECTED = 'REJECTED',
  RESET = 'RESET',
}

export { Status, PetSize, PetType, HttpMethod }