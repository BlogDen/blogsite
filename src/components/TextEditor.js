import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import React, { Component } from 'react'
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
// import htmlToDraft from 'html-to-draftjs';
import "../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

export default class TextEditor extends Component {
    state = {
        editorState: EditorState.createEmpty(),
        final: []
    }

    onEditorStateChange = (editorState) => {
        this.setState({
            editorState: editorState,
            final: draftToHtml(convertToRaw(editorState.getCurrentContent()))
        })
        this.props.setBodyInput(draftToHtml(convertToRaw(editorState.getCurrentContent())))
    }

    render() {
        const { editorState } = this.state

        return (
            <div>
                <Editor
                    editorState={editorState}
                    toolbarClassName="toolbarClassName"
                    wrapperClassName="wrapperClassName"
                    editorClassName="editorClassName"
                    onEditorStateChange={this.onEditorStateChange}
                />
            </div>
        )
    }
}


