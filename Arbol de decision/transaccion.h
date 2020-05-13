#include "string.h"
#include <iostream>
#include "Cuenta.h"
using namespace std;

class Transaccion{
private:
	string tipo;
	bool valida;
public:
	Transaccion();
	Transaccion(string t, bool v){
		tipo=t;
		valida=v;
	}
	bool extraccion(Cuenta* c){
		int monto;
		cout<<"¿Cuánto va a retirar? ";
		cin>>monto;
		if( monto <= c->getSaldo() ){
			c->setSaldo( c->getSaldo()-monto );
			cout<<"Saldo actualizado, nuevo saldo: $"<<c->getSaldo()<<endl;
			return true;
		}
		return false;
	}
	void depositar(Cuenta* c){
		int monto;
		cout<<"¿Cuánto va a depositar? ";
		cin>>monto;
		c->setSaldo( c->getSaldo()+monto );
		cout<<"Saldo actualizado, nuevo saldo: $"<<c->getSaldo()<<endl;
	}
	void saldo(Cuenta* c){
		cout<<"Su cuenta es: "<<c->getNumCuenta()<<endl;
		cout<<"Su saldo es: $"<<c->getSaldo()<<endl;
	}
};
