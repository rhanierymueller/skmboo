using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using webApi.Models;
using webApi.Util;

namespace webApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ClienteController : Controller
    {
        [HttpGet]
        [Route("listagem")]
        public List<ClienteModel> Listagem()
        {
            return new ClienteModel().Listagem();
        }

        //Get api/values/
        [HttpGet]
        [Route("cliente/{id}")]
        public ClienteModel RetornarCliente(int id)
        {
            return new ClienteModel().RetornarCliente(id);         
        }

        [HttpPost]
        [Route("registrarcliente")]
        public ReturnAllServices RegistrarCliente([FromBody]ClienteModel dados)
        {
            ReturnAllServices retorno = new ReturnAllServices();

            try
            {
                dados.RegistrarCliente();
                retorno.Result = true;
                retorno.ErrorMenssage = string.Empty;
            }
            catch (Exception ex)
            {

                retorno.Result = false;
                retorno.ErrorMenssage = "Erro ao tentar registrar um cliente" + ex.Message;
            }

            return retorno;
        }

        [HttpPut]
        [Route("atualizar/{id}")]
        public ReturnAllServices Atulizar(int id, [FromBody]ClienteModel dados)
        {
            ReturnAllServices retorno = new ReturnAllServices();

            try
            {
                dados.Id = id;
                dados.AtualizarCliente();
                retorno.Result = true;
                retorno.ErrorMenssage = string.Empty;
            }
            catch (Exception ex)
            {

                retorno.Result = false;
                retorno.ErrorMenssage = "Erro ao tentar atualizar um cliente" + ex.Message;
            }

            return retorno;
        }

    }
}
