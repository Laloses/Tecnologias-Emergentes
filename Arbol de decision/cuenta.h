#include <iostream>
using namespace std;

class Cuenta{
private:
	int saldo;
	int numCuenta;
public:
	Cuenta();
	Cuenta(int s, int n){
		saldo=s;
		numCuenta=n;
	}
	int getSaldo(){
		return saldo;
	}
	int getNumCuenta(){
		return numCuenta;
	}
	void setSaldo(int s){
		saldo=s;
		cout<<"Saldo Actualizado"<<endl;
	}
};
