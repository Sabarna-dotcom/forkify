import View from './view';
import previewView from './previewView';
import icons from "url:../../img/icons.svg";


class ResultsView extends View{
    _parentElement=document.querySelector('.results');
    _errorMessage = 'sorry, we could not find the recipe, please try another one';
    _message='';

    _generateMarkup() {
        return this._data.map(result => previewView.render(result,false)).join('');   
    }
}

export default new ResultsView();