import React, { Component } from 'react';
import axios from 'axios';
import Main from '../template/Main';

const headerProps = {
  icon: 'eye',
  title: 'Lista de Apresentações',
  subtitle: 'Apresentações / Lista',
};

const initialState = {
  apresentacoes: [],
  apresentacao: { data: '', horario: '', local: '', tempo: '', musicas: [] },
  musicas: [],
};

export default class UserCrud extends Component {
  state = { ...initialState };

  clearStateApresentacao(e) {
    e.preventDefault();
    this.setState({ apresentacao: initialState.apresentacao });
  }

  reloadPage() {
    document.location.reload(false);
  }

  componentWillMount() {
    let componenteAtual = this;

    axios({
      method: 'get',
      url: 'http://localhost:5000/api/apresentacoes',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    })
      .then(function (response) {
        console.log(response);
        componenteAtual.setState({ apresentacoes: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });

    axios({
      method: 'get',
      url: 'http://localhost:5000/api/musicas',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    })
      .then(function (response) {
        console.log(response);
        componenteAtual.setState({ musicas: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  listarMusicas(apresentacaoId) {
    const { apresentacoes } = this.state;
    const apresentacao = apresentacoes.find(
      apresentacao => apresentacao.id === apresentacaoId
    );

    return this.state.musicas.map(musica => {
      return (
        <React.Fragment>
          <div className='col-12'>
            <div className='input-group mb-1'>
              <div className='input-group-prepend'>
                <div className='input-group-text'>
                  <input
                    type='checkbox'
                    className='checkbox'
                    name='musicas'
                    value={musica.id}
                    defaultChecked={
                      apresentacaoId &&
                      apresentacao.musicas.find(
                        musicaId => musicaId === musica.id
                      )
                    }
                    onChange={e => this.addOrRemoveMusica(musica.id)}
                  />
                </div>
              </div>
              <label for='musicas' className='text-left form-control'>
                {' '}
                {musica.nome}
              </label>
              <br></br>
            </div>
          </div>
        </React.Fragment>
      );
    });
  }

  handleEditApresentacao(e, dadosApresentacao) {
    var apresentacao = { ...this.state.apresentacao };
    apresentacao = dadosApresentacao;
    this.setState({ apresentacao });
  }

  handleChangeApresentacao(e) {
    const apresentacao = { ...this.state.apresentacao };
    apresentacao[e.target.name] = e.target.value;
    this.setState({ apresentacao });
    console.log(this.state.apresentacao);
    console.log(e.target.name);
    console.log(e.target.value);
  }

  addOrRemoveMusica(idMusica) {
    let { apresentacao } = this.state;

    if (apresentacao.musicas.includes(idMusica)) {
      apresentacao = {
        ...apresentacao,
        musicas: apresentacao.musicas.filter(musica => musica !== idMusica),
      };
    } else {
      apresentacao = {
        ...apresentacao,
        musicas: [...apresentacao.musicas, idMusica],
      };
    }
    this.setState({ apresentacao });
  }

  incluirNovaApresentacao(e) {
    e.preventDefault();
    let componenteAtual = this;
    console.log(this.state.apresentacao);
    if (
      !this.state.apresentacao.data ||
      !this.state.apresentacao.horario ||
      !this.state.apresentacao.local ||
      !this.state.apresentacao.tempo ||
      !this.state.apresentacao.musicas
    ) {
      alert('Campos obrigatórios não preenchidos.');
    } else {
      axios({
        method: 'post',
        url: 'http://localhost:5000/api/apresentacoes',
        data: {
          data: this.state.apresentacao.data,
          horario: this.state.apresentacao.horario,
          local: this.state.apresentacao.local,
          tempo: this.state.apresentacao.tempo,
          musicas: this.state.apresentacao.musicas,
        },
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
      })
        .then(function (response) {
          // console.log(response);
          alert('Apresentação cadastrada com sucesso!');
          componenteAtual.reloadPage();
        })
        .catch(function (error) {
          console.log(error);
          alert('Ocorreu um erro ao cadastrar a apresentação!');
        });
    }
  }

  editarApresentacao(e, idApresentacao) {
    e.preventDefault();
    let componenteAtual = this;
    console.log(this.state.apresentacao.musicas);
    axios({
      method: 'put',
      url: 'http://localhost:5000/api/apresentacoes/' + idApresentacao,
      data: {
        data: this.state.apresentacao.data,
        horario: this.state.apresentacao.horario,
        local: this.state.apresentacao.local,
        tempo: this.state.apresentacao.tempo,
        musicas: this.state.apresentacao.musicas,
      },
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    })
      .then(function (response) {
        console.log(response);
        alert('Apresentação editada com sucesso!');
        componenteAtual.reloadPage();
      })
      .catch(function (error) {
        console.log(error);
        alert('Ocorreu um erro ao editar a apresentação!');
      });
  }

  excluirApresentacao(e, idApresentacao) {
    e.preventDefault();
    let componenteAtual = this;
    axios({
      method: 'delete',
      url: 'http://localhost:5000/api/apresentacoes/' + idApresentacao,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    })
      .then(function (response) {
        console.log(response);
        alert('Apresentação excluída com sucesso!');
        componenteAtual.reloadPage();
      })
      .catch(function (error) {
        console.log(error);
        alert('Ocorreu um erro ao excluir a apresentação!');
      });
  }

  renderTopButtons() {
    return (
      <div className='text-right'>
        <button
          type='button'
          className='btn btn-primary mr-1'
          data-toggle='modal'
          data-target='#inserirNovaApresentacao'
        >
          <i className='fa fa-plus mr-3'></i>
          Nova apresentação
        </button>
        <button className='btn btn-dark ml-1'>
          Ações
          <i class='fa fa-caret-down ml-3'></i>
        </button>

        {/* Início Modal nova Apresentação */}
        <div
          class='modal fade'
          id='inserirNovaApresentacao'
          tabindex='-1'
          role='dialog'
          aria-labelledby='ModalNovaApresentacao'
          aria-hidden='true'
        >
          <div class='modal-dialog modal-dialog-centered' role='document'>
            <div class='modal-content'>
              <div class='modal-header'>
                <h5 class='modal-title' id='ModalNovaApresentacao'>
                  <i className='fa fa-plus mr-3'></i> Nova apresentação
                </h5>
                <button
                  type='button'
                  class='close'
                  data-dismiss='modal'
                  aria-label='Fechar'
                >
                  <span aria-hidden='true'>&times;</span>
                </button>
              </div>
              <div class='modal-body'>
                <div className='form'>
                  <div className='row'>
                    <div className='col-12 col-md-6 text-left campo-form-modal'>
                      <div className='form-group'>
                        <label>Local</label>
                        <input
                          type='text'
                          className='form-control'
                          name='local'
                          onChange={e => this.handleChangeApresentacao(e)}
                          placeholder='Local da apresentação'
                        />
                      </div>
                    </div>

                    <div className='col-12 col-md-6 text-left campo-form-modal'>
                      <div className='form-group'>
                        <label>Data</label>
                        <input
                          type='date'
                          className='form-control'
                          name='data'
                          onChange={e => this.handleChangeApresentacao(e)}
                          placeholder='Data da apresentação'
                        />
                      </div>
                    </div>

                    <div className='col-12 col-md-6 text-left campo-form-modal'>
                      <div className='form-group'>
                        <label>Horário</label>
                        <input
                          type='time'
                          className='form-control'
                          name='horario'
                          onChange={e => this.handleChangeApresentacao(e)}
                          placeholder='Horário de apresentação'
                        />
                      </div>
                    </div>

                    <div className='col-12 col-md-6 text-left campo-form-modal'>
                      <div className='form-group'>
                        <label>Duração</label>
                        <input
                          type='time'
                          step='1'
                          className='form-control'
                          name='tempo'
                          onChange={e => this.handleChangeApresentacao(e)}
                          placeholder='Duração de apresentação'
                        />
                      </div>
                    </div>

                    <div className='col-12 col-md-8 offset-md-2 text-md-center campo-form-modal'>
                      <div className='form-group'>
                        <label>Músicas</label>
                        <br></br>
                        {this.listarMusicas()}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class='modal-footer'>
                <button
                  type='button'
                  class='btn btn-secondary'
                  data-dismiss='modal'
                  onClick={e => this.clearStateApresentacao(e)}
                >
                  Cancelar
                </button>
                <button
                  type='button'
                  class='btn btn-primary'
                  onClick={e => this.incluirNovaApresentacao(e)}
                >
                  Salvar
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Fim Modal nova Apresentação */}
      </div>
    );
  }

  renderTable() {
    return (
      <table className='table table-hover mt-4 text-center'>
        <thead>
          <tr>
            <th>Local</th>
            <th>Data</th>
            <th>Horário</th>
            <th>Duração</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>{this.renderRows()}</tbody>
      </table>
    );
  }

  renderRows() {
    return this.state.apresentacoes.map(apresentacao => {
      return (
        <tr key={apresentacao.id}>
          <td>{apresentacao.local}</td>
          <td>{apresentacao.data}</td>
          <td>{apresentacao.horario}</td>
          <td>{apresentacao.tempo}</td>
          <td>
            <button
              className='btn btn-warning'
              data-toggle='modal'
              data-target={'#editarApresentacao-' + apresentacao.id}
              onClick={e => this.handleEditApresentacao(e, apresentacao)}
            >
              <i className='fa fa-pencil'></i>
            </button>

            {/* Início Modal editar Apresentação */}
            <div
              className='modal fade'
              id={'editarApresentacao-' + apresentacao.id}
              role='dialog'
              aria-labelledby='ModalEditarApresentacao'
              aria-hidden='true'
            >
              <div
                className='modal-dialog modal-dialog-centered'
                role='document'
              >
                <div className='modal-content'>
                  <div className='modal-header'>
                    <h5 className='modal-title' id='ModalEditarApresentacao'>
                      <i className='fa fa-pencil'></i> Editar apresentação
                    </h5>
                    <button
                      type='button'
                      className='close'
                      data-dismiss='modal'
                      aria-label='Fechar'
                    >
                      <span aria-hidden='true'>&times;</span>
                    </button>
                  </div>
                  <div class='modal-body'>
                    <div className='form'>
                      <div className='row'>
                        <div className='col-12 col-md-6 text-left campo-form-modal'>
                          <div className='form-group'>
                            <label>Local</label>
                            <input
                              type='text'
                              className='form-control'
                              name='local'
                              value={this.state.apresentacao.local}
                              onChange={e => this.handleChangeApresentacao(e)}
                              placeholder='Local da apresentação'
                            />
                          </div>
                        </div>

                        <div className='col-12 col-md-6 text-left campo-form-modal'>
                          <div className='form-group'>
                            <label>Data</label>
                            <input
                              type='date'
                              className='form-control'
                              name='data'
                              value={this.state.apresentacao.data}
                              onChange={e => this.handleChangeApresentacao(e)}
                              placeholder='Data da apresentação'
                            />
                          </div>
                        </div>
                      </div>

                      <div className='row'>
                        <div className='col-12 col-md-6 text-left campo-form-modal'>
                          <div className='form-group'>
                            <label>Horário</label>
                            <input
                              type='time'
                              className='form-control'
                              name='horario'
                              value={this.state.apresentacao.horario}
                              onChange={e => this.handleChangeApresentacao(e)}
                              placeholder='Horário de apresentação'
                            />
                          </div>
                        </div>

                        <div className='col-12 col-md-6 text-left campo-form-modal'>
                          <div className='form-group'>
                            <label>Duração</label>
                            <input
                              type='time'
                              step='1'
                              className='form-control'
                              name='tempo'
                              value={this.state.apresentacao.tempo}
                              onChange={e => this.handleChangeApresentacao(e)}
                              placeholder='Duração de apresentação'
                            />
                          </div>
                        </div>

                        <div className='col-12 col-md-8 offset-md-2 text-md-center campo-form-modal'>
                          <div className='form-group'>
                            <label>Músicas</label>
                            <br></br>
                            {this.listarMusicas(apresentacao.id)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='modal-footer'>
                    <button
                      type='button'
                      className='btn btn-secondary'
                      data-dismiss='modal'
                      onClick={e => this.clearStateApresentacao(e)}
                    >
                      Cancelar
                    </button>
                    <button
                      type='button'
                      className='btn btn-primary'
                      onClick={e => this.editarApresentacao(e, apresentacao.id)}
                    >
                      Salvar
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* Fim Modal editar Apresentação */}

            <button
              className='btn btn-danger ml-1'
              data-toggle='modal'
              data-target={'#excluirApresentacao-' + apresentacao.id}
            >
              <i className='fa fa-trash'></i>
            </button>

            {/* Início Modal excluir Apresentação */}
            <div
              className='modal fade'
              id={'excluirApresentacao-' + apresentacao.id}
              role='dialog'
              aria-labelledby='ModalExcluirApresentacao'
              aria-hidden='true'
            >
              <div
                className='modal-dialog modal-dialog-centered'
                role='document'
              >
                <div className='modal-content'>
                  <div className='modal-header'>
                    <h5 className='modal-title' id='ModalExcluirApresentacao'>
                      <i className='fa fa-trash'></i> Excluir apresentação
                    </h5>
                    <button
                      type='button'
                      className='close'
                      data-dismiss='modal'
                      aria-label='Fechar'
                    >
                      <span aria-hidden='true'>&times;</span>
                    </button>
                  </div>
                  <div className='modal-body'>
                    Tem certeza que deseja excluir a apresentação no local{' '}
                    {apresentacao.local}?
                  </div>

                  <div className='modal-footer'>
                    <button
                      type='button'
                      className='btn btn-secondary'
                      data-dismiss='modal'
                    >
                      Cancelar
                    </button>
                    <button
                      type='button'
                      className='btn btn-danger'
                      onClick={e =>
                        this.excluirApresentacao(e, apresentacao.id)
                      }
                    >
                      Sim
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* Fim Modal excluir Apresentação */}
          </td>
        </tr>
      );
    });
  }

  renderBottomButtons() {
    return (
      <div className='paginacao-lista'>
        <nav>
          <ul className='pagination justify-content-end'>
            <li className='page-item disabled'>
              <a className='page-link' href=''>
                &laquo;
              </a>
            </li>
            <li className='page-item active'>
              <a className='page-link' href=''>
                1
              </a>
            </li>
            <li className='page-item'>
              <a className='page-link' href=''>
                2
              </a>
            </li>
            <li className='page-item'>
              <a className='page-link' href=''>
                3
              </a>
            </li>
            <li className='page-item disabled'>
              <a className='page-link' href=''>
                &raquo;
              </a>
            </li>
          </ul>
        </nav>
      </div>
    );
  }

  render() {
    return (
      <Main {...headerProps}>
        {this.renderTopButtons()}
        {this.renderTable()}
        {this.renderBottomButtons()}
      </Main>
    );
  }
}
