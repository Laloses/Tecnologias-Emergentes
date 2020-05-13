#include "string.h"
#include <iostream>
#include <time.h>
#include <windows.h>
#include <stdlib.h>
#include "transaccion.h"
using namespace std;

class Banco{
private:
	Cuenta* c;
	Transaccion* t;
public:
	Banco(){
		srand(time(NULL));
		int cuenSaldo = rand()%10000;
		int cuenNum = rand()%9999999;
		c = new Cuenta(cuenSaldo,cuenNum);
	}
	
	void hacerTransaccion(char tipo){
		bool val=true;
		if(rand()%15 == 14){
			val = false ;
		}
		if(!val){
			cout<<"Lo sentimos, la transaccion actual no es válida.. espere mientras trabajamos en esto."<<endl;
			Sleep(3000);
			hacerTransaccion(tipo);
		}
		else{
			cout<<"Operación válida, procesando..."<<endl;
			switch(tipo){
				case 'e':
					t = new Transaccion("retiro",val);
					if( !t->extraccion(this->c) ){
						cout<<"Ingrese un monton menor o igual a su saldo."<<endl;
					}
					break;
				case 'd':
					t = new Transaccion("depósito",val);
					t->depositar(this->c);
					break;
				case 's':
					t = new Transaccion("saldo",val);
					t->saldo(this->c);
					break;
			}
		}
	}
};

int main(){
	Banco bancomer;
	int ope;
	bool ejecutando=true;
	while(ejecutando){
		system("cls");
		cout<<"Bienvenido a nuestro banco.\n";
		cout<<" 1.- Retiro\n 2.- Depósito\n 3.- Consulta de saldo\n";
		cout<<"Eliga la operacion: "; cin>>ope;
		switch(ope){
		case 1:
			bancomer.hacerTransaccion('e');
			Sleep(3000);
			break;
		case 2:
			bancomer.hacerTransaccion('d');
			Sleep(3000);
			break;
		case 3:
			bancomer.hacerTransaccion('s');
			Sleep(3000);
			break;
		default:
			ejecutando=false;
		}
	}
}
