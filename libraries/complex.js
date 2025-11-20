
class Complex {
  constructor(Re, Im) {
    this.Re = Re;
    this.Im = Im;
  }

  static Add(a, b) {
    return new Complex(a.Re + b.Re, a.Im + b.Im);
  }

  static Multiply(a, b) {
    const re = a.Re * b.Re - a.Im * b.Im;
    const im = a.Re * b.Im + a.Im * b.Re;
    return new Complex(re, im);
  }
}
